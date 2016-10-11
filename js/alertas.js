/**
 * @author: Rafael Silvério Amaral
 * @url: https://github.com/rafaelsilverioit
 */

/** Verifica novas mensagens a cada 60s.
 *  1: Precisamos verificar o porque ao chamar 'location.reload()' todas as páginas estão sendo atualizadas.
 *  2: Precisamos verificar o motivo de quando utilizarmos a função 'loadAlerts()' a mesma é chamada apenas duas vezes e
 *     depois para de funcionar.
 */
//var id = setTimeout(function() {
//  loadAlerts();
//  location.reload();
//}, 60000);

// Pede permissão ao usuário antes para exibir as notificações.
document.addEventListener('DOMContentLoaded', function() {
  if(Notification.permission !== "granted") {
    Notification.requestPermission();
  }
  loadAlerts();
});

// Faz a requisição ajax para o monitoramento e faz o parsing do JSON para a notificação.
function loadAlerts() {
  // Script responsável por realizar a verificação das mensagens e retorná-las em JSON.
  // TROCAR PELA URL DO SISTEMA.
  var url = "http://<DOMINIO>/monitor/monitoramento.php";
  var title = "";
  var msg = "";

  $.getJSON(url).done(function(json) {
    $.each(json, function(i, item) {
      if(i === "titulo") {
        title = item;
      } else if (i === "corpo") {
        msg = item;
      }
    });

    // Passa os dados extraídos e exibe a notificação.
    showNotification(title, msg);
  }).fail(function(jqxhr, txtstatus, error) {
      var err = txtstatus + ", " + error;
      console.debug("Erro: " + err);
  });
}

// Exibe a notificação baseada no título e mensagens passados.
function showNotification(title, msg) {
  if(Notification.permission === 'granted') {
    var notify = new Notification(title, {
      icon: '../img/intercom.png',
      body: msg,
    });
    } else {
      Notification.requestPermission();
    }

  // Fecha a notificação após 10s.
  Notification.onshow = function() {
    setTimout(function() {
      Notification.close();
    }, 10000);
  };
}
