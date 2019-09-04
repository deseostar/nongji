Eth = {
	// VARIABLES =============================================================
  web3Provider: null,
  contracts: {},
  //web3:null,

  // FUNCTIONS =============================================================
  init: function() {
    return Eth.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 != 'undefined'){
      console.log("--------! undefined------")
      Eth.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);

    } else {
      console.log("------undefined--------")
      Eth.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(Eth.web3Provider);
    }

    return Eth.initContract();
  },

  initContract: function() {
    $.getJSON('NongJi.json', function(data) {
      Eth.contracts.NongJi = TruffleContract(data);
      Eth.contracts.NongJi.setProvider(Eth.web3Provider);

      return Eth.listenToEvents();
    })
  },
	
  setMessage: function() {	
    var id = $('#id').val();
    var username = $('#username').val();
    var message = $('#description').val();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      console.log(accounts);
      
      Eth.contracts.NongJi.deployed().then(function(instance) {
        return instance.setMessage(id, web3.toHex(username), message, {from:account});
      }).then(function() {
        $('#description').val('');
        $('#setModal').modal('hide');
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },
	
  listenToEvents: function() {
    Eth.contracts.NongJi.deployed().then(function(instance) {
      instance.LogSetMessage({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
        if(!error) {
          $('#events').append('<p>' + event.args._id + '계정에서 ' + web3.toUtf8(event.args._name) + '님이 메세지를 보냈습니다. -  ' + event.args._message + '</p>')
        } else {
          console.log(error);
        }
      })
    })
  }
};

$(function() {
  window.addEventListener("load", function () {
    Eth.init();
  });

  $('#setModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).parent().find('.id').text();
    var username = $(e.relatedTarget).parent().find('.username').text();

    $(e.currentTarget).find('#id').val(id);
    $(e.currentTarget).find('#username').val(username);
  });

  $('#getModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).parent().find('.id').text();

    Eth.contracts.NongJi.deployed().then(function(instance) {
      return instance.getMessage.call(id);
    }).then(function(inbox) {
      $(e.currentTarget).find('#username').text(web3.toUtf8(inbox[1]));
      $(e.currentTarget).find('#message').val(inbox[2]);
    }).catch(function(err) {
      console.log(err);
    })
  });
});