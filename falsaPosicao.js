// Função avalia a expressão matemática fornecida pelo usuário
function evaluateFunction(func, x) {
    try {
        return math.evaluate(func, { x: x });
    } catch (error) {
        return null; // Retorna null em caso de erro
    }
}

// Função para aplicar o método Regula Falsi
function regulaFalsi() {
    // Obtém valores de entrada do HTML
    let func = document.getElementById("func").value;
    func = func.replace(/X/g, 'x'); // Substitui "X" maiúsculo por "x" minúsculo
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    const tol = parseFloat(document.getElementById("tol").value);
    const maxIter = parseInt(document.getElementById("maxIter").value); // máximo de iterações
    
    // Calcula fa e fb uma vez no início
    let fa = evaluateFunction(func, a);
    let fb = evaluateFunction(func, b);

    // Valida a função e limites iniciais
    if (!func || isNaN(a) || isNaN(b) || isNaN(tol) || isNaN(maxIter)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Testa se a expressão é válida
    if (evaluateFunction(func, 0) === null) {
        alert("Função inválida! Verifique os valores que você inseriu na função.");
        return;
    }
    
    

    // Verificar que a função possui valores opostos nos limites
    if (fa * fb > 0) {
        alert("Erro: f(a) * f(b) não tem sinais opostos. Escolha limites em que a função mude de sinal.");
        return;
    }

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa resultados anteriores

    let xk, fxk;
    let iter = 0;

    while (iter < maxIter) {
        // Verificação de divisão por zero antes do cálculo de xk
        if (fb - fa === 0) {
            alert("Erro: Divisão por zero em xk, o método Regula Falsi não se aplica.");
            break;
        }

        // Aplica a fórmula de Regula Falsi
        xk = (a * fb - b * fa) / (fb - fa);
        fxk = evaluateFunction(func, xk);

        // Adiciona linha na tabela
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${iter + 1}</td>
            <td>${a.toFixed(6)}</td>
            <td>${fa.toFixed(6)}</td>
            <td>${b.toFixed(6)}</td>
            <td>${fb.toFixed(6)}</td>
            <td>${xk.toFixed(6)}</td>
            <td>${fxk.toFixed(6)}</td>
        `;
        tbody.appendChild(row);

        // Verifica a tolerância
        if (Math.abs(fxk) < tol) {
            //alert(`Raiz encontrada: x ≈ ${xk.toFixed(6)} com tolerância ${tol}`);
            break;
        }

        // Atualiza a ou b com base no sinal de f(xk) e recalcula fa ou fb
        if (fa * fxk < 0) {
            b = xk;
            fb = fxk; // Atualiza fb
        } else {
            a = xk;
            fa = fxk; // Atualiza fa
        }

        iter++;
    }

    if (iter === maxIter) {
        alert("Máximo de iterações atingido sem convergência.");
    }
}
