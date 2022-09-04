const FEEDBACK_WS_URL = "https://assistantmultiagentroutingbthj.m4f8jn2ctw8.eu-gb.codeengine.appdomain.cloud";
let assistantChatLog = [];
let customPanel;
function submitFeedback() {
  const email = document.getElementById("text-input-3").value;
  const feedback = document.getElementById("text-area-2").value;
  const timestamp = Date.now();
  console.log("textInput3", email);
  console.log("textArea2", feedback);
  const feedbackData = {email, feedback, assistantChatLog, timestamp};
  console.log("feedbackData", feedbackData);

  fetch(`${FEEDBACK_WS_URL}/feedback`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body:  JSON.stringify(feedbackData),
    mode: 'no-cors'
  })
  // .then(res => customPanel.close());
  customPanel.close();
}
/**
 * Watch for the customResponse event and forward incoming data to the correct handler.
 *
 * @param event The event passed from Watson Assistant
 * @param event.type The type of event, in this case "customResponse".
 * @param event.data.message The individual message from output.generic[].
 * @param event.data.element An HTML element that is rendered in web chat for you to manipulate.
 */
function customResponseHandler(event, instance) {
  const { message } = event.data;
  console.log("event", event);
  console.log("message", message);
  if( message.user_defined.show_feedback ) {
    customPanel = instance.customPanels.getPanel();
    const panelOptions = {
      "title": "Hvernig gekk samtalið?",
    };
    // https://the-carbon-components.netlify.app/?nav=form
    customPanel.hostElement.innerHTML =
    '<div class="bx--form-item">'
      +'<label for="text-input-3" class="bx--label">Við viljum gjarnan heyra þína skoðun:</label>'
      +'<div class="bx--form__helper-text">'
        +'Netfang'
      +'</div>'
      +'<input id="text-input-3" type="text"'
        +'class="bx--text-input"'
        +'placeholder="Optional placeholder text">'
    +'</div>'
    +'<div class="bx--form-item">'
      +'<label for="text-area-2" class="bx--label">Þín skoðun</label>'
      +'<div class="bx--form__helper-text">'
        +'Hvernig fannst þér samtalið ganga?'
      +'</div>'
      +'<textarea id="text-area-2" class="bx--text-area"'
        +'rows="4" cols="50" placeholder="Placeholder text."></textarea>'
    +'</div>'
    +'<div class="bx--form-item">'
      +'<button class="bx--btn bx--btn--primary" type="button" onclick="submitFeedback()">Senda</button>'
    +'</div>'
    ;

    setTimeout( () => {
      customPanel.open(panelOptions);
    }, message.user_defined.show_feedback_delay_ms || 500);

  }

}
function receiveHandler(event) {
  // console.log('intents:', event.data.output.intents);
  console.log('receive event',event);
  assistantChatLog.push(event);
}
function sendHandler(event) {
  console.log('send event',event);
  assistantChatLog.push(event);
}
