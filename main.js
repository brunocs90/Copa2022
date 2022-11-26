const GRUPOS = true;
const OITAVAS_FINAL = false;
const QUARTAS_FINAL = false;
const SEMI_FINAL = false;
const TERCEIRO_LUGAR = false;
const FINAL = false;

if (GRUPOS) {
	window.location.href = "./grupos.html";
} else if (OITAVAS_FINAL) {
	window.location.href = "./oitavas.html";
} else if (QUARTAS_FINAL) {
	window.location.href = "./quartas.html";
} else if (SEMI_FINAL) {
	window.location.href = "./semifinal.html";
} else if (TERCEIRO_LUGAR) {
	window.location.href = "./terceiro-lugar.html";
} else {
	window.location.href = "./final.html";
}