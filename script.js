/* ===========================
   Menu hamburger
   =========================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

/* ===========================
   Sticky header
   =========================== */

const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ===========================
   Modal galeria
   =========================== */

const galeriaItems = document.querySelectorAll('.galeria-item');
const modal = document.getElementById('modal-foto');
const modalImg = modal.querySelector('img');
const closeModal = modal.querySelector('.close-modal');

galeriaItems.forEach((item) => {
    item.addEventListener('click', () => {
        const src = item.querySelector('img').src;
        modalImg.src = src;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
});

/* ===========================
   Players simples (evita tocar dois ao mesmo tempo)
   =========================== */

(function() {
    const players = document.querySelectorAll('.spotify-player');
    let current = null;

    players.forEach((p) => {
        const btn = p.querySelector('.play-btn');
        const audio = p.querySelector('audio');
        const progress = p.querySelector('.progress-bar');

        if (!audio || !btn) return;

        btn.addEventListener('click', () => {
            // pausa outro player se houver
            if (current && current !== audio) {
                current.pause();
                current.currentTime = 0;

                const pb = document.querySelector('.play-btn.playing');
                if (pb) {
                    pb.classList.remove('playing');
                    pb.innerHTML = '<i class="fas fa-play"></i>';
                }

                current = null;
            }

            // toca / pause do player atual
            if (audio.paused) {
                audio.play();
                btn.innerHTML = '<i class="fas fa-pause"></i>';
                btn.classList.add('playing');
                current = audio;
            } else {
                audio.pause();
                btn.innerHTML = '<i class="fas fa-play"></i>';
                btn.classList.remove('playing');
                current = null;
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (progress) {
                progress.value = (audio.currentTime / (audio.duration || 1)) * 100;
            }
        });

        if (progress) {
            progress.addEventListener('input', () => {
                audio.currentTime = (progress.value / 100) * audio.duration;
            });
        }
    });
})();

/* ===========================
   Simulação de envio de formulário
   =========================== */

const form = document.getElementById('form-contato');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    form.reset();
});
