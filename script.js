const button = document.getElementById('submit-button');

const checkNumber = (number) => {
  if (isNaN(number)) {
    throw new Error('É necessário digitar números nos inputs.');
  }

  if (number < 0) {
    throw new Error('É necessário digitar números positivos nos inputs.');
  }
};

const checkVoidInput = (number1, number2, number3) => {
  if (!number1.length || !number2 || number3 === '') {
    throw new Error('É necessário preencher todos os campos.')
  }
};

const makeResult = () => {
  const currentPoints = document.getElementById('current-points').value;
  const deisredPoints = document.getElementById('desired-points').value;
  const matchesLeft = document.getElementById('matches-left').value;
  const pointsMissing = deisredPoints - currentPoints;
  const resultP = document.getElementById('result');
  resultP.style.textAlign = 'center';
  resultP.style.fontSize = '30px';
  resultP.style.marginTop = '50px';

  try {
    checkVoidInput(currentPoints, deisredPoints, matchesLeft);
    checkNumber(parseInt(currentPoints));
    checkNumber(parseInt(deisredPoints));
    checkNumber(parseInt(matchesLeft));

    if (currentPoints > deisredPoints) {
      throw new Error('Seus pontos atuais são maiores que os pontos desejados.')
    }

    for (let index = 1; index <= matchesLeft; index++) {
      let finalResult = 0;
      let defeats = matchesLeft - index;
      finalResult = (index * 4) + defeats;

      if (finalResult >= pointsMissing) {
        return resultP.innerText = `Você precisa de ${index} vitórias e ${defeats} derrotas para alcançar ${pointsMissing} pontos.`;
      }
    }
    return resultP.innerHTML = `Você não consegue alcançar ${pointsMissing} pontos em ${matchesLeft} partidas mesmo que vença todos os jogos. 
                                O máximo de pontos que você consegue alcançar é ${parseInt(currentPoints) + (4 * matchesLeft)}.`;

  } catch (error) {
    resultP.innerHTML = error.message;
  } finally {
    document.getElementById('current-points').value = '';
    document.getElementById('desired-points').value = '';
    document.getElementById('matches-left').value = '';
  }
};

button.addEventListener('click', makeResult);