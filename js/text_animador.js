function revealTextSimultaneously(element, targetText, interval) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#%";
  let currentText = Array(targetText.length).fill(" ");
  let completed = Array(targetText.length).fill(false);
  
  function updateText() {
    for (let i = 0; i < targetText.length; i++) {
      if (!completed[i]) {
        // Troca de caracteres aleatórios até acertar a letra final
        currentText[i] = characters.charAt(Math.floor(Math.random() * characters.length));
        if (Math.random() > 0.9) { // Controla a chance de acertar a letra certa
          currentText[i] = targetText[i];
          completed[i] = true; // Marca como finalizado
        }
      }
    }
    element.textContent = currentText.join("");
    // Para o intervalo quando todas as letras estão corretas
    if (completed.every((val) => val === true)) {
      clearInterval(intervalId);
    }
  }
  const intervalId = setInterval(updateText, interval);
}
const textElement = document.getElementById("text");
const targetText = "Wellington"; // Texto desejado
const textElement2 = document.getElementById("text2");
const targetText2 = "de Lima Soares";
revealTextSimultaneously(textElement, targetText, 200); // Velocidade de troca de letras
revealTextSimultaneously(textElement2,targetText2,100);