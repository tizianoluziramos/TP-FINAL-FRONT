import Swal from "sweetalert2";
import Toastify from "toastify-js";

export const alerta = (
  titulo?: string,
  mensaje?: string,
  icono?: "success" | "error" | "warning"
) => {
  Swal.fire({
    icon: icono,
    title: titulo || "",
    text: mensaje || "",
    showConfirmButton: false,
    timer: 3500,
    width: "240px",
  });
};

export const toast = (mensaje = "Cotización guardada.") => {
  Toastify({
    text: mensaje,
    duration: 4000,
    gravity: "top",
    position: "left",
    style: { background: "CornflowerBlue" },
  }).showToast();
};
