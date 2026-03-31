// Seção about
const about = document.querySelector('#about')

// Seção projects
const swiperWrapper = document.querySelector('.swiper-wrapper')

// Formulário
const formulario = document.querySelector('#formulario')

// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Função de preenchimento da seção about
async function getAboutGitHub() {
	try {
		// Requisição do tipo GET para a API do GitHub
		const resposta = await fetch(
			'https://api.github.com/users/livmachado',
		)

		// Converter a Resposta para JSON
		const perfil = await resposta.json()

		about.innerHTML = ''

		about.innerHTML = `
      
      <!-- Imagem da Seção About -->
      <figure class="about-image">
        <img src="${perfil.avatar_url}"
             alt="${perfil.name}"
        >
      </figure>

      <!-- Conteúdo da Seção About -->
      <article class="about-content">

        <h2>Sobre mim</h2>
		<p>
		Olá! Eu sou Lívia, 
		<strong>desenvolvedora Full Stack
		com foco em JavaScript</strong>.
		</p>

		<p>
		Comecei com Python na faculdade e tive 
		minha primeira experiência prática em uma Empresa Júnior, 
		desenvolvendo uma plataforma com <strong>React</strong>, <strong>Node.js</strong> e <strong>TypeScript</strong>.
		</p>

		<p>
		Atualmente, estou me aprofundando minhas softs e hards skills por meio do <strong>bootcamp da Generation</strong>, onde venho desenvolvendo projetos práticos.
		</p>

		<p>
		Venha ver meus projetos no Github ou baixe meu curriculo para maiores informações. 
		</p>

        <!-- Links (GitHub + Curriculo) e Dados do GitHub -->
        <div class="about-buttons-data">

          <!-- Links -->
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="./assets/docs/Livia_Campos_Dev.pdf" target="_blank" class="botao-outline" dowload>Currículo</a>
          </div>

          <!-- Dados - GitHub -->
          <div class="data-container">

            <!-- Nº de Seguidores -->
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <!-- Nº de Repositórios Públicos -->
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>

          </div>

        </div>
      </article>

    `
	} catch (error) {
		console.error('Erro ao buscar dados no GitHub', error)
	}
}

// Função buscar os dados dos projetos

async function getProjectsGitHub() {
	try {
		// Requisição do tipo GET para a API do GitHub
		const resposta = await fetch(
			'https://api.github.com/users/livmachado/repos?sort=updated&per_page=6',
		)

		// Converter a Resposta para JSON
		const repositorios = await resposta.json()

		swiperWrapper.innerHTML = ''

		// Ícones das linguagens
		const linguagens = {
			'JavaScript': 'javascript',
			'TypeScript': 'typescript',
			'Python': 'python',
			'Java': 'java',
			'HTML': 'html',
			'CSS': 'css',
			'PHP': 'php',
			'C#': 'csharp',
			'Go': 'go',
			'Kotlin': 'kotlin',
			'Swift': 'swift',
			'C': 'c',
			'C++': 'c_plus',
			'GitHub': 'github',
		}

		repositorios.forEach((repositorio) => {
			
      // Seleciona o nome da Linguagem padrão do repositório
      const linguagem = repositorio.language || 'GitHub'
			
      // Seleciona o ícone da Linguagem padrão do repositório
      const icone = linguagens[linguagem] ?? linguagens['GitHub']
			
      // Constrói a URL que aponta para o ícone da Linguagem padrão do repositório
      const urlIcone = `./assets/icons/languages/${icone}.svg`

			// Formata o Nome do Repositório
			const nomeFormatado = repositorio.name
				.replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
				.replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
        .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
				.toUpperCase() // Converte a string em letras maiúsculas

			// Função para truncar texto
      // Se a descrição possuir mais de 100 carcateres
      // seleciona os primeiros 97 e acrescenta '...' no final
      // Senão retorna o mesmo texto
			const truncar = (texto, limite) => texto.length > limite
        ? texto.substring(0, limite) + '...'
        : texto

      // Define a descrição do Repositório
      const descricao = repositorio.description
        ? truncar(repositorio.description, 100)
        : 'Projeto desenvolvido no GitHub'

			// tags
      const tags = repositorio.topics?.length > 0
        ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
        : `<span class="tag">${linguagem}</span>`;

      // Cria o Botão Deploy
      const botaoDeploy = repositorio.homepage
        ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
        : ''

      // Botões de ação
      const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${botaoDeploy}
        </div>
      `;

			// Constrói o Card
			swiperWrapper.innerHTML += `
      
          <div class="swiper-slide">

            <article class="project-card">

              <!-- Ícone da Tecnologia padrão do projeto -->
              <figure class="project-image">
                <img src="${urlIcone}"
                     alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                >
              </figure>

              <!-- Conteúdo do Projeto -->
              <div class="project-content">

                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>

                <!-- Tags do Projeto -->
                <div class="project-tags">
                  ${tags}
                </div>

                ${botoesAcao}

              </div>

            </article>

          </div>
      `
		})

		iniciarSwiper()
	} catch (error) {
		console.error('Erro ao buscar dados no GitHub', error)
	}
}

function iniciarSwiper() {
	new Swiper('.projects-swiper', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 24,
		centeredSlides: false,
		loop: true,
		watchOverflow: true,

		breakpoints: {
			0: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 40,
				centeredSlides: false,
			},
			769: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 40,
				centeredSlides: false,
			},
			1025: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 54,
				centeredSlides: false,
			},
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},

		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},

		grabCursor: true,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
	})
}
	if (formulario) {
	formulario.addEventListener('submit', function (event) {
	event.preventDefault()

	document
		.querySelectorAll('form span')
		.forEach((span) => (span.innerHTML = ''))

	let isValid = true

	const nome = document.querySelector('#nome')
	const erroNome = document.querySelector('#erro-nome')

	if (nome.value.trim().length < 3) {
		erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
		if (isValid) nome.focus()
		isValid = false
	}

	const email = document.querySelector('#email')
	const erroEmail = document.querySelector('#erro-email')

	if (!email.value.trim().match(emailRegex)) {
		erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
		if (isValid) email.focus()
		isValid = false
	}

	const assunto = document.querySelector('#assunto')
	const erroAssunto = document.querySelector('#erro-assunto')

	if (assunto.value.trim().length < 5) {
		erroAssunto.innerHTML =
			'O assunto deve ter no mínimo 5 caracteres'
		if (isValid) assunto.focus()
		isValid = false
	}

	const mensagem = document.querySelector('#mensagem')
	const erroMensagem = document.querySelector('#erro-mensagem')

	if (mensagem.value.trim().length === 0) {
		erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
		if (isValid) mensagem.focus()
		isValid = false
	}

	if (isValid) {
		const submitButton = formulario.querySelector(
			'button[type="submit"]',
		)
		submitButton.disabled = true
		submitButton.textContent = 'Enviando...'

		formulario.submit()
	}
	})
}

tsParticles.load("tsparticles", {
  fullScreen: { enable: false },

  background: {
    color: "transparent"
  },

  particles: {
    number: {
      value: 100,
      density: { enable: true, area: 800 }
    },

    color: {
      value: [
        "#6b36c8",
        "#9460db",
        "#38bdf8",
        "#22d3ee",
        "#ffffff"
      ]
    },

    shape: {
      type: "circle"
    },

    opacity: {
      value: { min: 0.2, max: 0.8 }
    },

    size: {
      value: { min: 1, max: 3 }
    },

    links: {
      enable: true,
      distance: 140,
      color: "#9460db",
      opacity: 0.2,
      width: 1
    },

    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      outModes: { default: "out" }
    }
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab" // 👈 suave e elegante
      },
      onClick: {
        enable: true,
        mode: "push"
      }
    },

    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.6
        }
      },

      push: {
        quantity: 3
      }
    }
  },

  detectRetina: true
});

// executar a função getAboutGitHub
getAboutGitHub()

// Executar a função getProjects GitHub
getProjectsGitHub()
