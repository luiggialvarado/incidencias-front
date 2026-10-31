const urlBase = "https://incidencias-backend-kgcm.onrender.com";

let maquinaSeleccionada = null;

function mostrarMensaje(texto) {
  document.getElementById("mensaje").textContent = texto;
}

function cargarMaquinas() {
  fetch(urlBase + "/maquinas")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (maquinas) {
      const lista = document.getElementById("lista-maquinas");
      lista.innerHTML = "";
      for (let i = 0; i < maquinas.length; i++) {
        crearItemMaquina(maquinas[i], lista);
      }
    })

    .catch(function () {
      mostrarMensaje("No se pudo cargar la lista de máquinas");
    });
}

function crearItemMaquina(maquina, lista) {
  const li = document.createElement("li");
  li.textContent =
    maquina.nombre + " (" + maquina.tipo + ", " + maquina.zona + ")";

  const boton = document.createElement("button");
  boton.textContent = "Ver incidencias";
  boton.addEventListener("click", function () {
    seleccionarMaquina(maquina);
  });

  li.appendChild(boton);
  lista.appendChild(li);
}

function seleccionarMaquina(maquina) {
  maquinaSeleccionada = maquina;
  document.getElementById("panel-incidencias").style.display = "block";
  document.getElementById("titulo-incidencias").textContent =
    "Incidencias de " + maquina.nombre;
  cargarIncidencias();
}

function cargarIncidencias() {
  fetch(urlBase + "/maquinas/" + maquinaSeleccionada.id + "/incidencias")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (incidencias) {
      const lista = document.getElementById("lista-incidencias");
      lista.innerHTML = "";
      if (incidencias.length === 0) {
        const vacio = document.createElement("li");
        vacio.textContent = "No hay incidencias para esta máquina.";
        lista.appendChild(vacio);
      }
      for (let i = 0; i < incidencias.length; i++) {
        const li = document.createElement("li");
        const fecha = incidencias[i].fecha.replace("T", " ").substring(0, 16);
        li.textContent =
          fecha +
          " - " +
          incidencias[i].estado +
          " - " +
          incidencias[i].descripcion;
        lista.appendChild(li);
      }
    })
    .catch(function () {
      mostrarMensaje("No se pudo cargar la lista de incidencias");
    });
}

function guardarMaquina() {
  const nombre = document.getElementById("nombre").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const zona = document.getElementById("zona").value.trim();

  if (nombre === "" || tipo === "" || zona === "") {
    mostrarMensaje("Todos los campos son obligatorios");
    return;
  }

  const datos = {
    nombre: nombre,
    tipo: tipo,
    zona: zona,
  };

  fetch(urlBase + "/maquinas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then(function (respuesta) {
      if (respuesta.ok) {
        document.getElementById("nombre").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("zona").value = "";
        mostrarMensaje("Máquina guardada correctamente");
        cargarMaquinas();
      } else {
        mostrarMensaje("Error al guardar la máquina");
      }
    })
    .catch(function () {
      mostrarMensaje("No se pudo conectar al servidor");
    });
}

function guardarIncidencia() {
  const descripcion = document.getElementById("descripcion").value.trim();

  if (descripcion === "") {
    mostrarMensaje("La descripción es obligatoria");
    return;
  }

  const datos = {
    descripcion: descripcion,
  };

  fetch(urlBase + "/maquinas/" + maquinaSeleccionada.id + "/incidencias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then(function (respuesta) {
      if (respuesta.ok) {
        document.getElementById("descripcion").value = "";
        mostrarMensaje("Incidencia guardada correctamente");
        cargarIncidencias();
      } else {
        mostrarMensaje("Error al guardar la incidencia");
      }
    })
    .catch(function () {
      mostrarMensaje("No se pudo conectar al servidor");
    });
}

document
  .getElementById("btn-guardar-maquina")
  .addEventListener("click", guardarMaquina);
document
  .getElementById("btn-guardar-incidencia")
  .addEventListener("click", guardarIncidencia);

cargarMaquinas();
