/* =========================================================
   ELEMENTOS
========================================================= */

const intro = document.getElementById('starWarsIntro');
const skipBtn = document.getElementById('skipIntro');
const welcome = document.getElementById('welcomeScreen');
const site = document.getElementById('site');

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const toast = document.getElementById('toast');


/* =========================================================
   INTRO -> BEM-VINDO -> SITE
========================================================= */

let welcomeStarted = false;
let welcomeTimer;


/* =========================================================
   FECHAR BEM-VINDO
========================================================= */

function closeWelcome() {

  clearTimeout(welcomeTimer);

  welcome.classList.add('leave');

  welcome.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

  /*
    Libera o site somente agora.
  */

  site.classList.add('ready');

  setTimeout(() => {
    welcome.remove();
  }, 900);
}


/* =========================================================
   ABRIR BEM-VINDO
========================================================= */

function openWelcome() {

  if (welcomeStarted) return;

  welcomeStarted = true;

  document.body.style.overflow = 'hidden';

  welcome.classList.add('show');

  welcome.setAttribute('aria-hidden', 'false');


  /*
    Depois de 5 segundos fecha automaticamente.
  */

  welcomeTimer = setTimeout(() => {

    closeWelcome();

  }, 5000);

}


/* =========================================================
   QUANDO A INTRO TERMINAR
========================================================= */

intro.addEventListener('animationend', (e) => {

  if (e.animationName === 'introFadeOut') {

    openWelcome();

  }

});


/* =========================================================
   PULAR INTRO
========================================================= */

skipBtn.addEventListener('click', () => {

  intro.classList.add('hidden');

  openWelcome();

});


/* =========================================================
   SEGURANÇA
========================================================= */

setTimeout(() => {

  if (!welcomeStarted) {
    openWelcome();
  }

}, 4700);


/* =========================================================
   CLIQUE NO BEM-VINDO
========================================================= */

welcome.addEventListener('click', () => {

  closeWelcome();

});


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener('keydown', (e) => {

  if (
    welcomeStarted &&
    document.body.contains(welcome) &&
    ['Enter', ' ', 'Escape'].includes(e.key)
  ) {

    closeWelcome();

  }

});


/* =========================================================
   HEADER
========================================================= */

window.addEventListener('scroll', () => {

  header.classList.toggle(
    'scrolled',
    window.scrollY > 20
  );

}, { passive: true });


/* =========================================================
   MENU MOBILE
========================================================= */

menuBtn.addEventListener('click', () => {

  const open = nav.classList.toggle('open');

  menuBtn.setAttribute(
    'aria-expanded',
    open
  );

});


nav.querySelectorAll('a').forEach((link) => {

  link.addEventListener('click', () => {

    nav.classList.remove('open');

    menuBtn.setAttribute(
      'aria-expanded',
      'false'
    );

  });

});


/* =========================================================
   REVEAL AO ROLAR
========================================================= */

const revealEls =
  document.querySelectorAll('.reveal');


if ('IntersectionObserver' in window) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'visible'
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealEls.forEach((el) => {

    observer.observe(el);

  });

} else {

  revealEls.forEach((el) => {

    el.classList.add('visible');

  });

}


/* =========================================================
   BRILHO DO CURSOR
========================================================= */

const glow =
  document.querySelector('.cursor-glow');


if (
  glow &&
  window.matchMedia('(pointer: fine)').matches
) {

  window.addEventListener(
    'mousemove',
    (e) => {

      glow.style.left =
        e.clientX + 'px';

      glow.style.top =
        e.clientY + 'px';

    }
  );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

  toast.textContent = message;

  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove('show');

  }, 3200);

}


document
  .querySelectorAll('[data-toast]')
  .forEach((el) => {

    el.addEventListener(
      'click',
      (e) => {

        const href =
          el.getAttribute('href');


        if (!href || href === '#') {

          e.preventDefault();

          showToast(
            el.dataset.toast
          );

        }

      }
    );

  });


/* =========================================================
   ANO
========================================================= */

document.getElementById('year').textContent =
  new Date().getFullYear();


/* =========================================================
   TERMINAL
========================================================= */

const terminalOverlay =
  document.getElementById(
    'terminalOverlay'
  );

const terminalButton =
  document.getElementById(
    'terminalButton'
  );

const closeTerminalBtn =
  document.getElementById(
    'closeTerminal'
  );

const terminalInput =
  document.getElementById(
    'terminalInput'
  );

const terminalOutput =
  document.getElementById(
    'terminalOutput'
  );

const terminalBody =
  terminalOutput.parentElement;


const history = [];

let historyIndex = 0;


/* =========================================================
   ABRIR TERMINAL
========================================================= */

function openTerminal() {

  terminalOverlay.classList.add('open');

  terminalOverlay.setAttribute(
    'aria-hidden',
    'false'
  );

  setTimeout(() => {

    terminalInput.focus();

  }, 250);

}


/* =========================================================
   FECHAR TERMINAL
========================================================= */

function closeTerminal() {

  terminalOverlay.classList.remove('open');

  terminalOverlay.setAttribute(
    'aria-hidden',
    'true'
  );

}


/* =========================================================
   ESCREVER NO TERMINAL
========================================================= */

function printLine(html) {

  const p =
    document.createElement('p');

  p.innerHTML = html;

  terminalOutput.appendChild(p);

  terminalBody.scrollTop =
    terminalBody.scrollHeight;

}


/* =========================================================
   COMANDOS
========================================================= */

const commands = {

  help: () => [

    'Comandos disponíveis:',

    '<span class="terminal-green">help</span>      mostra esta lista',

    '<span class="terminal-green">curso</span>     sobre o curso',

    '<span class="terminal-green">techs</span>     tecnologias estudadas',

    '<span class="terminal-green">projetos</span>  projetos da turma',

    '<span class="terminal-green">local</span>     onde fica o curso',

    '<span class="terminal-green">hello</span>     diga olá',

    '<span class="terminal-green">clear</span>     limpa o terminal',

    '<span class="terminal-green">exit</span>      fecha o terminal'

  ],


  curso: () => [

    'Curso Técnico em Desenvolvimento de Sistemas',

    'Programação, web, banco de dados e projetos reais.'

  ],


  techs: () => [

    '<span class="terminal-blue">HTML</span> • ' +
    '<span class="terminal-blue">CSS</span> • ' +
    '<span class="terminal-blue">JavaScript</span> • ' +
    '<span class="terminal-blue">SQL</span> • ' +
    '<span class="terminal-blue">Git</span> • ' +
    '<span class="terminal-blue">APIs</span>'

  ],


  projetos: () => [

    '<span class="terminal-purple">01</span> Nexus School',

    '<span class="terminal-purple">02</span> Chat Online',

    '<span class="terminal-purple">03</span> Sistemas & Dados'

  ],


  local: () => [

    'CEEP • Laranjeiras do Sul — PR'

  ],


  hello: () => [

    'Olá, futuro dev! 👋 Bem-vindo a essa jornada.'

  ],


  sudo: () => [

    'Boa tentativa 😄 Aqui você não tem permissão de root.'

  ]

};


/* =========================================================
   EXECUTAR COMANDO
========================================================= */

function runCommand(raw) {

  const cmd =
    raw.trim().toLowerCase();


  if (!cmd) return;


  printLine(
    `<span class="terminal-green">CEEP@DS:~$</span> ${
      raw.replace(/</g, '&lt;')
    }`
  );


  /* CLEAR */

  if (cmd === 'clear') {

    terminalOutput.innerHTML = '';

    return;

  }


  /* EXIT */

  if (cmd === 'exit') {

    closeTerminal();

    return;

  }


  /* COMANDO EXISTE */

  if (commands[cmd]) {

    commands[cmd]().forEach(
      printLine
    );

  } else {

    printLine(
      `comando não encontrado: ${
        cmd.replace(/</g, '&lt;')
      }. Digite <span class="terminal-green">help</span>.`
    );

  }

}


/* =========================================================
   EVENTOS DO TERMINAL
========================================================= */

terminalButton.addEventListener(
  'click',
  openTerminal
);


closeTerminalBtn.addEventListener(
  'click',
  closeTerminal
);


terminalOverlay.addEventListener(
  'click',
  (e) => {

    if (e.target === terminalOverlay) {

      closeTerminal();

    }

  }
);


document.addEventListener(
  'keydown',
  (e) => {

    if (
      e.key === 'Escape' &&
      terminalOverlay.classList.contains('open')
    ) {

      closeTerminal();

    }

  }
);


/* =========================================================
   INPUT DO TERMINAL
========================================================= */

terminalInput.addEventListener(
  'keydown',
  (e) => {

    /* ENTER */

    if (e.key === 'Enter') {

      const value =
        terminalInput.value;


      if (value.trim()) {

        history.push(value);

        historyIndex =
          history.length;

      }


      runCommand(value);

      terminalInput.value = '';

    }


    /* SETA PARA CIMA */

    else if (e.key === 'ArrowUp') {

      e.preventDefault();


      if (historyIndex > 0) {

        terminalInput.value =
          history[--historyIndex];

      }

    }


    /* SETA PARA BAIXO */

    else if (e.key === 'ArrowDown') {

      e.preventDefault();


      if (
        historyIndex <
        history.length - 1
      ) {

        terminalInput.value =
          history[++historyIndex];

      } else {

        historyIndex =
          history.length;

        terminalInput.value = '';

      }

    }

  }
);
