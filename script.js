function calcularBTC() {
    // Parámetros constantes
    const inflacion = 0.07; // 7% inflación anual
    const rendimiento = 3; // Rendimiento anual (200% = 3x)

    // Obtener valores del formulario
    const retirosIniciales = parseFloat(document.getElementById('retirosIniciales').value);
    const anios = parseInt(document.getElementById('anios').value);

    if (isNaN(retirosIniciales) || isNaN(anios) || retirosIniciales <= 0 || anios <= 0) {
      document.getElementById('result').textContent = "Por favor, ingrese valores válidos para los campos.";
      return;
    } //validaciones

    let btcInicial = 0;
    let tablaHTML = `<table>
      <thead>
        <tr>
          <th>Año</th>
          <th>Retiro (USD)</th>
          <th>Capital restante (USD)</th>
        </tr>
      </thead>
      <tbody>`;

    // Variables para el cálculo anual
    let capitalRestante = 0;

    for (let n = 1; n <= anios; n++) {
      const retiroAnual = retirosIniciales * Math.pow(1 + inflacion, n - 1); // Ajuste por inflación
      const capitalNecesario = retiroAnual / Math.pow(rendimiento, n - 1); // Ajuste por rendimiento
      btcInicial += capitalNecesario;

      if (n === 1) {
        capitalRestante = btcInicial * rendimiento - retiroAnual;
      } else {
        capitalRestante = capitalRestante * rendimiento - retiroAnual;
      }

      // Formatear capital restante para mejor legibilidad
      const capitalRestanteFormateado = Math.floor(capitalRestante).toLocaleString('en-US');

      // Agregar fila a la tabla
      tablaHTML += `<tr>
        <td>${n}</td>
        <td>${retiroAnual.toFixed(2)}</td>
        <td>${capitalRestanteFormateado}</td>
      </tr>`;
    }

    tablaHTML += `</tbody></table>`;

    // Mostrar resultado
    document.getElementById('result').textContent = `Cantidad mínima en Bitcoin necesaria: ${btcInicial.toFixed(2)} dólares`;
    document.getElementById('tablaResultados').innerHTML = tablaHTML;
  }