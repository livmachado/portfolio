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
        <p>Lorem ipsum dolor sit amet consectetur, 
          adipisicing elit. Natus minus perspiciatis 
          reprehenderit error voluptatibus labore 
          assumenda doloremque quibusdam sequi? 
          Distinctio autem sed laudantium nostrum 
          reprehenderit eligendi animi adipisci 
          a neque.</p>
        <p>Mussum Ipsum, cacilds vidis litro abertis. 
          Per aumento de cachacis, eu reclamis. 
          Suco de cevadiss deixa as pessoas mais interessantis. 
          Quem manda na minha terra sou euzis! 
          Quem num gosta di mé, boa gentis num é.</p>

        <!-- Links (GitHub + Curriculo) e Dados do GitHub -->
        <div class="about-buttons-data">

          <!-- Links -->
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="#" target="_blank" class="botao-outline">Currículo</a>
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

// executar a função getAboutGitHub
getAboutGitHub()

// Executar a função getProjects GitHub
getProjectsGitHub()