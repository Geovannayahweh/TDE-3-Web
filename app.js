// Configuração da API
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts() {
  const getBtn = document.getElementById("getBtn");
  const getLoading = document.getElementById("getLoading");
  const getError = document.getElementById("getError");
  const getResult = document.getElementById("getResult");

  try {
    getError.classList.add("hidden");
    getError.textContent = "";
    getResult.innerHTML = "";
    getBtn.disabled = true;
    getLoading.classList.remove("hidden");

    console.log("Iniciando requisição GET...");
    const response = await fetch(`${API_BASE_URL}/posts?_limit=5`);

    if (!response.ok) {
      throw new Error(
        `Erro HTTP! Status: ${response.status} - ${response.statusText}`
      );
    }

    const posts = await response.json();
    console.log("Posts recebidos:", posts);

    displayPosts(posts, getResult);
  } catch (error) {
    console.error("Erro na requisição GET:", error.message);
    getError.classList.remove("hidden");
    getError.innerHTML = `
            <strong>Erro na requisição GET:</strong><br>
            ${error.message}
        `;
  } finally {
    getLoading.classList.add("hidden");
    getBtn.disabled = false;
  }
}

function displayPosts(posts, container) {
  if (posts.length === 0) {
    container.innerHTML = '<p class="info">Nenhum post encontrado.</p>';
    return;
  }

  let html = '<div class="posts-list">';

  posts.forEach((post) => {
    html += `
            <div class="post-card">
                <div class="post-header">
                    <h3>Usuário #${post.userId} - Post #${post.id}</h3>
                </div>
                <h4 class="post-title">${escapeHtml(post.title)}</h4>
                <p class="post-body">${escapeHtml(post.body)}</p>
            </div>
        `;
  });

  html += "</div>";
  container.innerHTML = html;
}

// ==================== REQUISIÇÃO POST ====================
async function createPost(event) {
  event.preventDefault();

  const postForm = document.getElementById("postForm");
  const postLoading = document.getElementById("postLoading");
  const postError = document.getElementById("postError");
  const postResult = document.getElementById("postResult");

  try {
    postError.classList.add("hidden");
    postError.textContent = "";
    postResult.innerHTML = "";
    postLoading.classList.remove("hidden");

    const userId = document.getElementById("userIdInput").value;
    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    const postData = {
      userId: parseInt(userId),
      title: title,
      body: body,
    };

    console.log("Iniciando requisição POST com dados:", postData);
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(
        `Erro HTTP! Status: ${response.status} - ${response.statusText}`
      );
    }

    const newPost = await response.json();
    console.log("Post criado com sucesso:", newPost);

    postResult.innerHTML = `
            <div class="success-message">
                <h3>Post Criado com Sucesso!</h3>
                <div class="post-card">
                    <div class="post-header">
                        <h3>Usuário #${newPost.userId} - Post #${
      newPost.id
    }</h3>
                    </div>
                    <h4 class="post-title">${escapeHtml(newPost.title)}</h4>
                    <p class="post-body">${escapeHtml(newPost.body)}</p>
                </div>
                <p class="info"><em>Nota: Dados mock, não persistidos no servidor</em></p>
            </div>
        `;

    postForm.reset();
  } catch (error) {
    console.error("Erro na requisição POST:", error.message);
    postError.classList.remove("hidden");
    postError.innerHTML = `
            <strong>Erro na requisição POST:</strong><br>
            ${error.message}
        `;
  } finally {
    postLoading.classList.add("hidden");
  }
}

// ==================== REQUISIÇÃO DELETE ====================
async function deletePost() {
  const deleteBtn = document.getElementById("deleteBtn");
  const deleteLoading = document.getElementById("deleteLoading");
  const deleteError = document.getElementById("deleteError");
  const deleteResult = document.getElementById("deleteResult");

  try {
    deleteError.classList.add("hidden");
    deleteError.textContent = "";
    deleteResult.innerHTML = "";
    deleteBtn.disabled = true;
    deleteLoading.classList.remove("hidden");

    const postId = document.getElementById("postIdInput").value;

    if (!postId || postId < 1 || postId > 100) {
      throw new Error("Por favor, insira um ID válido (1-100)");
    }

    console.log(`Iniciando requisição DELETE para post #${postId}...`);
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Erro HTTP! Status: ${response.status} - ${response.statusText}`
      );
    }

    console.log(`Post #${postId} deletado com sucesso`);

    deleteResult.innerHTML = `
            <div class="success-message">
                <h3>Post Deletado com Sucesso!</h3>
                <p>O post com ID <strong>#${postId}</strong> foi removido da API.</p>
                <p class="info"><em>Nota: Dados mock, não persistidos no servidor</em></p>
            </div>
        `;
  } catch (error) {
    console.error("Erro na requisição DELETE:", error.message);
    deleteError.classList.remove("hidden");
    deleteError.innerHTML = `
            <strong>Erro na requisição DELETE:</strong><br>
            ${error.message}
        `;
  } finally {
    deleteLoading.classList.add("hidden");
    deleteBtn.disabled = false;
  }
}

// ==================== UTILITÁRIOS ====================
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// ==================== EVENT LISTENERS ====================
document.addEventListener("DOMContentLoaded", function () {
  const getBtn = document.getElementById("getBtn");
  getBtn.addEventListener("click", fetchPosts);

  const postForm = document.getElementById("postForm");
  postForm.addEventListener("submit", createPost);

  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", deletePost);

  console.log("Aplicação inicializada com sucesso!");
});
