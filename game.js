let score = 0;
let currentQuestion = {};

function generateQuestion() {
    // Generar una pregunta aleatoria entre proporcional directa, inversa y mixta
    let questionType = Math.random();

    if (questionType < 0.33) {
        // Proporción directa: Si aumentas los cocineros, aumentan los platos proporcionalmente
        let cocineros = Math.floor(Math.random() * 5) + 1; // Número de cocineros (de 1 a 5)
        let platos = Math.floor(Math.random() * 40) + 10; // Número de platos (de 10 a 50)
        let nuevosCocineros = Math.floor(Math.random() * 10) + 1; // Nuevos cocineros (de 1 a 10)

        currentQuestion = {
            question: `Si tienes ${cocineros} cocineros, se hacen ${platos} platos. ¿Cuántos platos se harán si tienes ${nuevosCocineros} cocineros?`,
            correctAnswer: (platos / cocineros) * nuevosCocineros, // Usamos la fórmula de proporción directa
            type: 'directa'
        };

    } else if (questionType < 0.66) {
        // Proporción inversa: Si disminuyes los cocineros, los platos aumentan proporcionalmente
        let cocineros = Math.floor(Math.random() * 5) + 1; // Número de cocineros (de 1 a 5)
        let platos = Math.floor(Math.random() * 40) + 10; // Número de platos (de 10 a 50)
        let nuevosCocineros = Math.floor(Math.random() * cocineros) + 1; // Nuevos cocineros (menos que los iniciales)

        currentQuestion = {
            question: `Si tienes ${cocineros} cocineros, se hacen ${platos} platos. ¿Cuántos platos se harán si tienes ${nuevosCocineros} cocineros?`,
            correctAnswer: (platos / cocineros) * nuevosCocineros, // Usamos la fórmula de proporción inversa
            type: 'inversa'
        };

    } else {
        // Proporción mixta: Si cambias los cocineros y los platos, afecta el tiempo
        let cocineros = Math.floor(Math.random() * 5) + 1; // Número de cocineros (de 1 a 5)
        let platos = Math.floor(Math.random() * 40) + 10; // Número de platos (de 10 a 50)
        let tiempo = Math.floor(Math.random() * 3) + 1; // Tiempo en horas (de 1 a 3 horas)
        let nuevosCocineros = Math.floor(Math.random() * 5) + 1; // Nuevos cocineros (de 1 a 5 cocineros)
        let nuevosPlatos = Math.floor(Math.random() * 5) + 1; // Nuevos platos (de 1 a 5 platos)

        currentQuestion = {
            question: `Si tienes ${cocineros} cocineros, se hacen ${platos} platos en ${tiempo} horas. ¿Cuántas horas se harán si tienes ${nuevosCocineros} cocineros para hacer ${nuevosPlatos} platos?`,
            correctAnswer: (tiempo * platos) / (nuevosPlatos * nuevosCocineros), // Proporción mixta
            type: 'mixta'
        };
    }

    // Actualizar la pregunta en el juego
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    // Comprobar si la respuesta del jugador es correcta
    let userAnswer = parseFloat(document.getElementById('answer-input').value);

    if (userAnswer === currentQuestion.correctAnswer) {
        score += 10;
        document.getElementById('feedback').textContent = "¡Correcto!";
        document.getElementById('feedback').style.color = "green";
    } else {
        document.getElementById('feedback').textContent = "¡Incorrecto! Intenta nuevamente.";
        document.getElementById('feedback').style.color = "red";
    }

    // Actualizar los puntos y generar una nueva pregunta
    document.getElementById('score').textContent = `Puntos: ${score}`;
    setTimeout(generateQuestion, 1500); // Esperar antes de generar la siguiente pregunta
}

// Iniciar el juego
generateQuestion();
