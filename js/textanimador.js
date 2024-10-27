function revealText(element, targetText, interval) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let currentText = Array(targetText.length).fill(" ");
    
    let index = 0;

    function updateText() {
      if (index < targetText.length) {
        for (let i = 0; i <= index; i++) {
          if (i < index) {
            currentText[i] = targetText[i];
          } else {
            currentText[i] = characters.charAt(Math.floor(Math.random() * characters.length));
          }
        }

        element.textContent = currentText.join("");
        
        if (currentText[index] === targetText[index]) {
          index++;
        }
      } else {
        clearInterval(intervalId);
      }
    }

    const intervalId = setInterval(updateText, interval);
  }

  const textElement = document.getElementById("text");
  const targetText = "COMPUTADOR"; // Texto desejado
  revealText(textElement, targetText, 50); // Velocidade de troca de letras
