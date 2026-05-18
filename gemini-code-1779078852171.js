// 1. 게시글 및 사진 등록 기능
function addPost() {
    const author = document.getElementById('post-author');
    const content = document.getElementById('post-content');
    const fileInput = document.getElementById('post-file');
    const postList = document.getElementById('post-list');

    if (!author.value || !content.value) {
        alert("이름과 내용을 입력해주세요!");
        return;
    }

    const li = document.createElement('li');
    li.className = 'post-item';

    let imgHtml = '';
    if (fileInput.files && fileInput.files[0]) {
        // 이미지 파일을 읽어서 화면에 표시
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'post-image';
            li.appendChild(img);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }

    li.innerHTML = `
        <div class="post-header">👤 ${escapeHtml(author.value)}</div>
        <p>${escapeHtml(content.value)}</p>
    `;

    postList.insertBefore(li, postList.firstChild);

    // 초기화
    author.value = '';
    content.value = '';
    fileInput.value = '';
}

// 2. 한줄 의견 등록 기능
function addOpinion() {
    const author = document.getElementById('opinion-author');
    const text = document.getElementById('opinion-input');
    const list = document.getElementById('opinion-list');

    if (!author.value || !text.value) {
        alert("이름과 의견을 입력해주세요!");
        return;
    }

    const li = document.createElement('li');
    li.className = 'opinion-item';
    li.innerHTML = `
        <span>${escapeHtml(text.value)}</span>
        <strong style="font-size:0.8rem; color:#888;">- ${escapeHtml(author.value)}</strong>
    `;

    list.insertBefore(li, list.firstChild);

    // 초기화
    author.value = '';
    text.value = '';
}

// 3. 보안을 위한 텍스트 변환 (XSS 방지)
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}