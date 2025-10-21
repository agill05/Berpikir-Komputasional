// Load header and footer
async function loadLayout() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        try {
            const headerResponse = await fetch('layout/header.html');
            if (!headerResponse.ok) {
                throw new Error('Failed to load header');
            }
            const headerHtml = await headerResponse.text();
            headerPlaceholder.innerHTML = headerHtml;
            // Initialize hamburger menu after header is loaded
            initializeHamburgerMenu();
        } catch (error) {
            console.error('Error loading header:', error);
            // Fallback: create basic header if fetch fails
            headerPlaceholder.innerHTML = `
                <header>
                    <nav class="navbar">
                        <div class="nav-container">
                            <div class="logo-section">
                                <a href="index.html" class="logo-link">
                                    <img src="logo/ung.png" alt="Logo UNG" class="logo ung-logo">
                                    <img src="logo/spenduGo.png" alt="Logo SpenduGo" class="logo">
                                </a>
                            </div>
                            <div class="brand-title">
                                <h1>Berpikir Komputasional</h1>
                                <p>Media Pembelajaran Interaktif</p>
                            </div>
                            <div class="nav-menu-section">
                                <div class="hamburger" id="hamburger">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <ul id="nav-menu">
                                    <li><a href="index.html">Beranda</a></li>
                                    <li><a href="materi.html">Materi</a></li>
                                    <li><a href="dekomposisi.html">Dekomposisi</a></li>
                                    <li><a href="pola.html">Pola</a></li>
                                    <li><a href="abstraksi.html">Abstraksi</a></li>
                                    <li><a href="algoritma.html">Algoritma</a></li>
                                    <li><a href="quiz.html">Quiz</a></li>
                                    <li><a href="about.html">Tentang</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="nav-backdrop" id="nav-backdrop"></div>
                    </nav>
                </header>
            `;
            initializeHamburgerMenu();
        }
    }

    if (footerPlaceholder) {
        try {
            const footerResponse = await fetch('layout/footer.html');
            if (!footerResponse.ok) {
                throw new Error('Failed to load footer');
            }
            const footerHtml = await footerResponse.text();
            footerPlaceholder.innerHTML = footerHtml;
        } catch (error) {
            console.error('Error loading footer:', error);
            // Fallback: create basic footer if fetch fails
            footerPlaceholder.innerHTML = `
                <footer class="site-footer">
                    <div class="footer-container">
                        <div class="footer-content">
                            <div class="footer-section">
                                <h3>Tentang Kami</h3>
                                <p>Media pembelajaran interaktif untuk memahami konsep berpikir komputasional melalui materi yang menarik dan latihan praktis.</p>
                            </div>
                            <div class="footer-section">
                                <h3>Navigasi Cepat</h3>
                                <ul class="footer-links">
                                    <li><a href="index.html">Beranda</a></li>
                                    <li><a href="materi.html">Materi</a></li>
                                    <li><a href="quiz.html">Quiz</a></li>
                                    <li><a href="about.html">Tentang</a></li>
                                </ul>
                            </div>
                            <div class="footer-section">
                                <h3>Topik Utama</h3>
                                <ul class="footer-links">
                                    <li><a href="dekomposisi.html">Dekomposisi</a></li>
                                    <li><a href="pola.html">Pola</a></li>
                                    <li><a href="abstraksi.html">Abstraksi</a></li>
                                    <li><a href="algoritma.html">Algoritma</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2025 Berpikir Komputasional. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        }
    }
}

// Sound Effects
const soundBenar = new Audio('effeckSound/benar.mp3');
const soundSalah = new Audio('effeckSound/salah.mp3');

// Drag and Drop functionality for Dekomposisi
document.addEventListener('DOMContentLoaded', function() {
    // Dekomposisi Drag & Drop
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZone = document.getElementById('drop-zone');
    const checkOrderBtn = document.getElementById('check-order');
    const feedback = document.getElementById('feedback');

    if (dragItems.length > 0 && dropZone) {
        dragItems.forEach(item => {
            item.addEventListener('dragstart', dragStart);
        });

        dropZone.addEventListener('dragover', dragOver);
        dropZone.addEventListener('drop', drop);

        if (checkOrderBtn) {
            checkOrderBtn.addEventListener('click', checkOrder);
        }
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggedItem = Array.from(document.querySelectorAll('.drag-item')).find(item => item.textContent.trim() === data);
        if (draggedItem) {
            dropZone.appendChild(draggedItem);
        }
    }

    function checkOrder() {
        const items = dropZone.querySelectorAll('.drag-item');
        const correctOrder = ['Ambil roti', 'Oleskan selai', 'Tambahkan selada', 'Tutup dengan roti atas'];
        const userOrder = Array.from(items).map(item => item.textContent);

        if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
            feedback.textContent = 'Benar! Urutan langkah membuat sandwich sudah tepat.';
            feedback.style.color = 'green';
            soundBenar.play();
        } else {
            feedback.textContent = 'Urutan belum tepat. Coba lagi!';
            feedback.style.color = 'red';
            soundSalah.play();
        }
    }

    // Pola Pattern Quiz
    const patternAnswer = document.getElementById('pattern-answer');
    const checkPatternBtn = document.getElementById('check-pattern');
    const patternFeedback = document.getElementById('pattern-feedback');

    if (checkPatternBtn) {
        checkPatternBtn.addEventListener('click', function() {
            const answer = parseInt(patternAnswer.value);
            if (answer === 9) {
                patternFeedback.textContent = 'Benar! Pola bilangan ganjil.';
                patternFeedback.style.color = 'green';
                soundBenar.play();
            } else {
                patternFeedback.textContent = 'Salah. Pola adalah bilangan ganjil.';
                patternFeedback.style.color = 'red';
                soundSalah.play();
            }
        });
    }

    // Pola Interactive Demo Buttons
    const patternBtns = document.querySelectorAll('.pattern-btn');
    const patternDisplay = document.getElementById('pattern-display');

    if (patternBtns.length > 0 && patternDisplay) {
        patternBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                if (type === 'arithmetic') {
                    patternDisplay.innerHTML = '<p>Deret Aritmatika: 2, 4, 6, 8, 10, ...</p><p>Setiap suku selanjutnya diperoleh dengan menambahkan bilangan tetap (beda) ke suku sebelumnya.</p>';
                } else if (type === 'geometric') {
                    patternDisplay.innerHTML = '<p>Deret Geometri: 2, 4, 8, 16, 32, ...</p><p>Setiap suku selanjutnya diperoleh dengan mengalikan suku sebelumnya dengan bilangan tetap (rasio).</p>';
                } else if (type === 'fibonacci') {
                    patternDisplay.innerHTML = '<p>Deret Fibonacci: 1, 1, 2, 3, 5, 8, 13, ...</p><p>Setiap suku selanjutnya adalah jumlah dari dua suku sebelumnya.</p>';
                }
            });
        });
    }

    // Fibonacci Demo
    const generateFibBtn = document.getElementById('generate-fib');
    const fibSequence = document.getElementById('fib-sequence');

    if (generateFibBtn && fibSequence) {
        generateFibBtn.addEventListener('click', function() {
            const n = parseInt(document.getElementById('fib-n').value);
            if (n > 0 && n <= 20) {
                let fib = [1, 1];
                for (let i = 2; i < n; i++) {
                    fib.push(fib[i-1] + fib[i-2]);
                }
                fibSequence.textContent = fib.slice(0, n).join(', ');
            } else {
                fibSequence.textContent = 'Masukkan angka antara 1-20';
            }
        });
    }

    // Dekomposisi Divide and Conquer Demo
    const divideBtn = document.getElementById('divide-btn');
    const sortBtn = document.getElementById('sort-btn');
    const dividedArrays = document.getElementById('divided-arrays');
    const sortedResult = document.getElementById('sorted-result');

    if (divideBtn && sortBtn) {
        divideBtn.addEventListener('click', function() {
            const originalArray = [8, 3, 1, 7, 4, 2, 9, 5, 6];
            const mid = Math.floor(originalArray.length / 2);
            const left = originalArray.slice(0, mid);
            const right = originalArray.slice(mid);
            dividedArrays.innerHTML = `<p>Bagian Kiri: [${left.join(', ')}]</p><p>Bagian Kanan: [${right.join(', ')}]</p>`;
            sortBtn.style.display = 'inline-block';
        });

        sortBtn.addEventListener('click', function() {
            const left = [8, 3, 1, 7];
            const right = [4, 2, 9, 5, 6];
            const sortedLeft = left.sort((a, b) => a - b);
            const sortedRight = right.sort((a, b) => a - b);
            sortedResult.innerHTML = `<p>Bagian Kiri Terurut: [${sortedLeft.join(', ')}]</p><p>Bagian Kanan Terurut: [${sortedRight.join(', ')}]</p><p>Gabung dan urutkan: [${[...sortedLeft, ...sortedRight].sort((a, b) => a - b).join(', ')}]</p>`;
        });
    }

    // Abstraksi Search Demo
    const linearSearchBtn = document.getElementById('linear-search');
    const binarySearchBtn = document.getElementById('binary-search');
    const searchResult = document.getElementById('search-result');

    if (linearSearchBtn && binarySearchBtn && searchResult) {
        linearSearchBtn.addEventListener('click', function() {
            const array = document.getElementById('search-array').value.split(',').map(Number);
            const target = parseInt(document.getElementById('search-target').value);
            let found = false;
            let index = -1;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === target) {
                    found = true;
                    index = i;
                    break;
                }
            }
            searchResult.textContent = found ? `Ditemukan di indeks ${index}` : 'Tidak ditemukan';
        });

        binarySearchBtn.addEventListener('click', function() {
            const array = document.getElementById('search-array').value.split(',').map(Number).sort((a, b) => a - b);
            const target = parseInt(document.getElementById('search-target').value);
            let left = 0;
            let right = array.length - 1;
            let found = false;
            let index = -1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (array[mid] === target) {
                    found = true;
                    index = mid;
                    break;
                } else if (array[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            searchResult.textContent = found ? `Ditemukan di indeks ${index} (array terurut: [${array.join(', ')}])` : 'Tidak ditemukan';
        });
    }

    // Algoritma Types Demo
    const algoBtns = document.querySelectorAll('.algo-btn');
    const algorithmExplanation = document.getElementById('algorithm-explanation');

    if (algoBtns.length > 0 && algorithmExplanation) {
        algoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                if (type === 'brute') {
                    algorithmExplanation.innerHTML = '<p><strong>Brute Force:</strong> Mencoba semua kemungkinan solusi. Contoh: Mencoba semua kombinasi password.</p>';
                } else if (type === 'greedy') {
                    algorithmExplanation.innerHTML = '<p><strong>Greedy:</strong> Memilih solusi optimal lokal pada setiap langkah. Contoh: Algoritma untuk memberikan kembalian dengan jumlah koin minimal.</p>';
                } else if (type === 'divide') {
                    algorithmExplanation.innerHTML = '<p><strong>Divide & Conquer:</strong> Pecah masalah menjadi submasalah yang lebih kecil, selesaikan secara rekursif, lalu gabungkan. Contoh: Quicksort atau Mergesort.</p>';
                }
            });
        });
    }

    // Algoritma Complexity Demo
    const showComplexityBtn = document.getElementById('show-complexity');
    const complexityChart = document.getElementById('complexity-chart');

    if (showComplexityBtn && complexityChart) {
        showComplexityBtn.addEventListener('click', function() {
            const selected = document.getElementById('complexity-select').value;
            if (selected === 'O(1)') {
                complexityChart.innerHTML = '<p>Konstan: Waktu eksekusi tidak bergantung pada ukuran input. Contoh: Akses array berdasarkan indeks.</p>';
            } else if (selected === 'O(log n)') {
                complexityChart.innerHTML = '<p>Logaritmik: Waktu berkurang drastis saat input bertambah. Contoh: Binary search.</p>';
            } else if (selected === 'O(n)') {
                complexityChart.innerHTML = '<p>Linear: Waktu eksekusi sebanding dengan ukuran input. Contoh: Linear search.</p>';
            } else if (selected === 'O(n log n)') {
                complexityChart.innerHTML = '<p>Linearithmic: Kombinasi linear dan logaritmik. Contoh: Sorting algorithms seperti quicksort.</p>';
            } else if (selected === 'O(n^2)') {
                complexityChart.innerHTML = '<p>Kuadratik: Waktu eksekusi berbanding kuadrat dengan input. Contoh: Bubble sort.</p>';
            }
        });
    }

    // Abstraksi Activity
    const checkAbstractionBtn = document.getElementById('check-abstraction');
    const abstractionFeedback = document.getElementById('abstraction-feedback');

    if (checkAbstractionBtn) {
        checkAbstractionBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.abstraction-activity input[type="checkbox"]:checked');
            const selected = Array.from(checkboxes).map(cb => cb.value);
            const correct = ['ibu kota', 'pulau Jawa'];

            if (selected.length === correct.length && selected.every(val => correct.includes(val))) {
                abstractionFeedback.textContent = 'Benar! Informasi penting untuk peta adalah ibu kota dan lokasi pulau.';
                abstractionFeedback.style.color = 'green';
                soundBenar.play();
            } else {
                abstractionFeedback.textContent = 'Belum tepat. Fokus pada informasi lokasi dan status kota.';
                abstractionFeedback.style.color = 'red';
                soundSalah.play();
            }
        });
    }

    // AI Prediction Demo
    const predictBtn = document.getElementById('predict');
    const predictionResult = document.getElementById('prediction-result');

    if (predictBtn && predictionResult) {
        predictBtn.addEventListener('click', function() {
            const x = parseFloat(document.getElementById('input-x').value);
            if (!isNaN(x)) {
                // Simple linear prediction: y = 2x + 1
                const y = 2 * x + 1;
                predictionResult.textContent = `Prediksi Y: ${y}`;
                predictionResult.style.color = 'green';
                soundBenar.play();
            } else {
                predictionResult.textContent = 'Masukkan nilai X yang valid.';
                predictionResult.style.color = 'red';
                soundSalah.play();
            }
        });
    }

    // Algoritma Flowchart
    const flowchartSteps = document.querySelectorAll('.step');
    const flowchartCanvas = document.getElementById('flowchart-canvas');
    const checkFlowchartBtn = document.getElementById('check-flowchart');
    const flowchartFeedback = document.getElementById('flowchart-feedback');

    if (flowchartSteps.length > 0 && flowchartCanvas) {
        flowchartSteps.forEach(step => {
            step.addEventListener('dragstart', dragStart);
        });

        flowchartCanvas.addEventListener('dragover', dragOver);
        flowchartCanvas.addEventListener('drop', dropFlowchart);

        if (checkFlowchartBtn) {
            checkFlowchartBtn.addEventListener('click', checkFlowchart);
        }
    }

    function dropFlowchart(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggedStep = Array.from(document.querySelectorAll('.step')).find(step => step.textContent.trim() === data);
        if (draggedStep) {
            flowchartCanvas.appendChild(draggedStep);
        }
    }

    function checkFlowchart() {
        const steps = flowchartCanvas.querySelectorAll('.step');
        const correctOrder = ['Mulai', 'Input angka', 'Bandingkan', 'Output maksimum', 'Selesai'];
        const userOrder = Array.from(steps).map(step => step.textContent);

        if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
            flowchartFeedback.textContent = 'Benar! Flowchart algoritma mencari nilai maksimum sudah tepat.';
            flowchartFeedback.style.color = 'green';
            soundBenar.play();
        } else {
            flowchartFeedback.textContent = 'Urutan belum tepat. Urutkan dari mulai hingga selesai.';
            flowchartFeedback.style.color = 'red';
            soundSalah.play();
        }
    }

    // Quiz functionality - One question at a time with timer
    let currentQuestionIndex = parseInt(localStorage.getItem('quizCurrentQuestionIndex')) || 0;
    let score = parseInt(localStorage.getItem('quizScore')) || 0;
    let quizCompleted = localStorage.getItem('quizCompleted') === 'true';
    let timerInterval;
    let timeLeft = 10;

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const questions = [
        {
            question: "Apa yang dimaksud dengan dekomposisi?",
            type: "radio",
            options: [
                { value: "a", text: "Memecah masalah besar menjadi kecil" },
                { value: "b", text: "Mengenali pola" },
                { value: "c", text: "Menyaring informasi" },
                { value: "d", text: "Urutan langkah" }
            ],
            correct: "a"
        },
        {
            question: "Contoh pola: 2, 4, 6, 8, ?",
            type: "number",
            correct: 10
        },
        {
            question: "Apa fungsi abstraksi?",
            type: "radio",
            options: [
                { value: "a", text: "Memecah masalah" },
                { value: "b", text: "Menyaring informasi penting" },
                { value: "c", text: "Mengenali pola" },
                { value: "d", text: "Membuat langkah" }
            ],
            correct: "b"
        },
        {
            question: "Apa itu algoritma?",
            type: "radio",
            options: [
                { value: "a", text: "Memecah masalah" },
                { value: "b", text: "Urutan langkah-langkah menyelesaikan masalah" },
                { value: "c", text: "Mengenali pola" },
                { value: "d", text: "Menyaring informasi" }
            ],
            correct: "b"
        },
        {
            question: "Contoh dekomposisi dalam membuat sandwich:",
            type: "checkbox",
            options: [
                { value: "a", text: "Ambil roti" },
                { value: "b", text: "Oleskan selai" },
                { value: "c", text: "Tambahkan selada" },
                { value: "d", text: "Tutup dengan roti atas" }
            ],
            correct: ["a", "b", "c", "d"]
        },
        {
            question: "Deret Fibonacci: 1, 1, 2, 3, 5, ?",
            type: "number",
            correct: 8
        },
        {
            question: "Apa yang dilakukan dalam abstraksi?",
            type: "radio",
            options: [
                { value: "a", text: "Menambahkan detail" },
                { value: "b", text: "Menghilangkan detail tidak penting" },
                { value: "c", text: "Membuat masalah lebih rumit" },
                { value: "d", text: "Mengenali pola" }
            ],
            correct: "b"
        },
        {
            question: "Jenis algoritma yang mencoba semua kemungkinan:",
            type: "radio",
            options: [
                { value: "a", text: "Greedy" },
                { value: "b", text: "Brute Force" },
                { value: "c", text: "Divide & Conquer" },
                { value: "d", text: "Dynamic Programming" }
            ],
            correct: "b"
        },
        {
            question: "Pola dalam deret: 1, 3, 5, 7, ?",
            type: "number",
            correct: 9
        },
        {
            question: "Kompleksitas algoritma O(n log n) termasuk:",
            type: "radio",
            options: [
                { value: "a", text: "Linear search" },
                { value: "b", text: "Bubble sort" },
                { value: "c", text: "Quicksort" },
                { value: "d", text: "Binary search" }
            ],
            correct: "c"
        },
        {
            question: "Contoh pola geometri: 2, 4, 8, 16, ?",
            type: "number",
            correct: 32
        },
        {
            question: "Dalam dekomposisi, masalah besar dipecah menjadi:",
            type: "radio",
            options: [
                { value: "a", text: "Masalah yang lebih besar" },
                { value: "b", text: "Masalah yang lebih kecil" },
                { value: "c", text: "Masalah yang sama" },
                { value: "d", text: "Masalah yang tidak terkait" }
            ],
            correct: "b"
        },
        {
            question: "Abstraksi dalam peta dunia:",
            type: "checkbox",
            options: [
                { value: "a", text: "Ibu kota negara" },
                { value: "b", text: "Lokasi pulau" },
                { value: "c", text: "Warna rambut penduduk" },
                { value: "d", text: "Jumlah pohon" }
            ],
            correct: ["a", "b"]
        },
        {
            question: "Algoritma yang memilih solusi optimal lokal:",
            type: "radio",
            options: [
                { value: "a", text: "Brute Force" },
                { value: "b", text: "Greedy" },
                { value: "c", text: "Divide & Conquer" },
                { value: "d", text: "Backtracking" }
            ],
            correct: "b"
        },
        {
            question: "Deret Fibonacci berikutnya setelah 5: 8, 13, ?",
            type: "number",
            correct: 21
        },
        {
            question: "Pola dalam: A, B, C, D, ?",
            type: "text",
            correct: "e"
        },
        {
            question: "Kompleksitas O(1) berarti:",
            type: "radio",
            options: [
                { value: "a", text: "Waktu konstan" },
                { value: "b", text: "Waktu linear" },
                { value: "c", text: "Waktu kuadratik" },
                { value: "d", text: "Waktu logaritmik" }
            ],
            correct: "a"
        },
        {
            question: "Dekomposisi membantu dalam:",
            type: "radio",
            options: [
                { value: "a", text: "Membuat masalah lebih rumit" },
                { value: "b", text: "Menyelesaikan masalah step by step" },
                { value: "c", text: "Menghilangkan semua detail" },
                { value: "d", text: "Mengenali pola saja" }
            ],
            correct: "b"
        },
        {
            question: "Contoh pola aritmatika: 5, 10, 15, 20, ?",
            type: "number",
            correct: 25
        },
        {
            question: "Abstraksi dalam algoritma pencarian:",
            type: "radio",
            options: [
                { value: "a", text: "Mencari semua data" },
                { value: "b", text: "Fokus pada data penting untuk pencarian" },
                { value: "c", text: "Mengabaikan data sama sekali" },
                { value: "d", text: "Membuat data lebih banyak" }
            ],
            correct: "b"
        },
        {
            question: "Algoritma Divide & Conquer contohnya:",
            type: "radio",
            options: [
                { value: "a", text: "Linear search" },
                { value: "b", text: "Mergesort" },
                { value: "c", text: "Bubble sort" },
                { value: "d", text: "Selection sort" }
            ],
            correct: "b"
        },
        {
            question: "Pola dalam bilangan prima: 2, 3, 5, 7, ?",
            type: "number",
            correct: 11
        },
        {
            question: "Dalam abstraksi, informasi yang tidak penting:",
            type: "radio",
            options: [
                { value: "a", text: "Dipertahankan" },
                { value: "b", text: "Dihilangkan" },
                { value: "c", text: "Ditambahkan" },
                { value: "d", text: "Diubah" }
            ],
            correct: "b"
        },
        {
            question: "Kompleksitas O(n^2) contohnya:",
            type: "radio",
            options: [
                { value: "a", text: "Binary search" },
                { value: "b", text: "Linear search" },
                { value: "c", text: "Bubble sort" },
                { value: "d", text: "Accessing array" }
            ],
            correct: "c"
        },
        {
            question: "Dekomposisi dalam pemrograman:",
            type: "radio",
            options: [
                { value: "a", text: "Membuat satu fungsi besar" },
                { value: "b", text: "Memecah program menjadi fungsi-fungsi kecil" },
                { value: "c", text: "Menghapus semua kode" },
                { value: "d", text: "Menambahkan komentar saja" }
            ],
            correct: "b"
        }
    ];

    // Shuffle the questions order will be done when starting the quiz

    const questionDisplay = document.getElementById('question-display');
    const feedbackDiv = document.getElementById('feedback');
    const checkAnswerBtn = document.getElementById('check-answer');
    const resultsDiv = document.getElementById('results');
    const scoreP = document.getElementById('score');
    const feedbackP = document.getElementById('feedback');
    const retryBtn = document.getElementById('retry-quiz');

    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            // Reset quiz state
            localStorage.removeItem('quizCurrentQuestionIndex');
            localStorage.removeItem('quizScore');
            localStorage.removeItem('quizCompleted');
            // Show start button and hide results
            const startQuizBtn = document.getElementById('start-quiz');
            if (startQuizBtn) {
                startQuizBtn.style.display = 'block';
            }
            resultsDiv.style.display = 'none';
        });
    }

    function startQuiz() {
        // Shuffle questions each time quiz starts
        shuffle(questions);
        currentQuestionIndex = 0;
        score = 0;
        quizCompleted = false;
        localStorage.setItem('quizCompleted', 'false');
        localStorage.setItem('quizCurrentQuestionIndex', '0');
        localStorage.setItem('quizScore', '0');
        resultsDiv.style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        const question = questions[index];
        let html = `<h3>${index + 1}. ${question.question}</h3>`;

        if (question.type === 'radio' || question.type === 'checkbox') {
            html += '<div class="options">';
            const shuffledOptions = shuffle([...question.options]);
            shuffledOptions.forEach(option => {
                html += `<label><input type="${question.type}" name="quiz-answer" value="${option.value}"> ${option.text}</label>`;
            });
            html += '</div>';
        } else if (question.type === 'number') {
            html += `<input type="number" id="quiz-answer" placeholder="Jawaban">`;
        } else if (question.type === 'text') {
            html += `<input type="text" id="quiz-answer" placeholder="Jawaban (huruf)">`;
        }

        questionDisplay.innerHTML = html;
        feedbackDiv.style.display = 'none';
        checkAnswerBtn.style.display = 'block';
        checkAnswerBtn.disabled = false;

        // Add event listeners for inputs
        const inputs = questionDisplay.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    checkAnswer();
                }
            });
            input.addEventListener('paste', function(e) {
                e.preventDefault();
            });
        });

        // Start timer
        timeLeft = 10;
        document.getElementById('timer-count').textContent = timeLeft;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer-count').textContent = timeLeft;
            if (timeLeft <= 0) {
                checkAnswerBtn.disabled = true;
                clearInterval(timerInterval);
                // Auto-submit with no answer (count as wrong)
                checkAnswer();
            }
        }, 1000);
    }

    function checkAnswer() {
        const question = questions[currentQuestionIndex];
        let isCorrect = false;
        let correctAnswerText = '';

        if (question.type === 'radio') {
            const selected = document.querySelector('input[name="quiz-answer"]:checked');
            isCorrect = selected && selected.value === question.correct;
            if (!isCorrect) {
                const correctOption = question.options.find(opt => opt.value === question.correct);
                correctAnswerText = correctOption ? correctOption.text : question.correct;
            }
        } else if (question.type === 'checkbox') {
            const selected = Array.from(document.querySelectorAll('input[name="quiz-answer"]:checked')).map(cb => cb.value);
            isCorrect = selected.length === question.correct.length && selected.every(val => question.correct.includes(val));
            if (!isCorrect) {
                const correctOptions = question.options.filter(opt => question.correct.includes(opt.value));
                correctAnswerText = correctOptions.map(opt => opt.text).join(', ');
            }
        } else if (question.type === 'number') {
            const answer = parseInt(document.getElementById('quiz-answer').value);
            isCorrect = answer === question.correct;
            if (!isCorrect) {
                correctAnswerText = question.correct.toString();
            }
        } else if (question.type === 'text') {
            const answer = document.getElementById('quiz-answer').value.toLowerCase();
            isCorrect = answer === question.correct;
            if (!isCorrect) {
                correctAnswerText = question.correct;
            }
        }

        if (isCorrect) {
            score++;
            feedbackDiv.textContent = 'Benar!';
            feedbackDiv.style.color = 'green';
            soundBenar.play();
        } else {
            feedbackDiv.innerHTML = `Salah! Jawaban yang benar adalah: <strong>${correctAnswerText}</strong>`;
            feedbackDiv.style.color = 'red';
            soundSalah.play();
        }

        feedbackDiv.style.display = 'block';
        checkAnswerBtn.style.display = 'none';

        // Save progress to localStorage
        localStorage.setItem('quizCurrentQuestionIndex', currentQuestionIndex);
        localStorage.setItem('quizScore', score);

        // Clear timer when moving to next question
        if (timerInterval) clearInterval(timerInterval);

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                showResults();
            }
        }, 1500);
    }

    function showResults(isFinal = true) {
        const percentage = Math.round((score / questions.length) * 100);
        scoreP.innerHTML = `<span class="score-display">Skor Anda: ${score}/${questions.length} (${percentage}%)</span>`;

        let feedbackClass = '';
        if (percentage >= 80) {
            feedbackClass = 'feedback-excellent';
            feedbackP.textContent = 'Luar biasa! Anda memahami semua konsep dengan sangat baik. Terus belajar!';
        } else if (percentage >= 60) {
            feedbackClass = 'feedback-good';
            feedbackP.textContent = 'Bagus! Anda memiliki pemahaman yang baik, tapi ada beberapa konsep yang perlu diulang.';
        } else if (percentage >= 40) {
            feedbackClass = 'feedback-average';
            feedbackP.textContent = 'Cukup baik, tapi perlu lebih banyak latihan. Kembali ke materi untuk memperdalam pemahaman.';
        } else {
            feedbackClass = 'feedback-poor';
            feedbackP.textContent = 'Perlu belajar lebih banyak. Silakan ulangi materi dan coba quiz lagi.';
        }
        feedbackP.className = feedbackClass;

        if (isFinal) {
            // Mark quiz as completed
            localStorage.setItem('quizCompleted', 'true');
        }

        document.getElementById('quiz-container').style.display = 'none';
        resultsDiv.style.display = 'block';

        // Hide the Start Quiz button after completion
        const startQuizBtn = document.getElementById('start-quiz');
        if (startQuizBtn) {
            startQuizBtn.style.display = 'none';
        }
    }

    if (checkAnswerBtn) {
        checkAnswerBtn.addEventListener('click', checkAnswer);
    }



    // Add event listener for start button
    const startQuizBtn = document.getElementById('start-quiz');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            startQuizBtn.style.display = 'none';
            document.getElementById('quiz-container').style.display = 'block';
            startQuiz();
        });
    }

    // Start quiz or show results if completed, or show current score immediately on refresh/navigation
    if (quizCompleted) {
        showResults();
    } else if (score > 0 || currentQuestionIndex > 0) {
        // Show current score immediately instead of continuing
        showResults(false);
    } else {
        // Show start button
        if (startQuizBtn) startQuizBtn.style.display = 'block';
    }

    // No restart button needed, retry button handles shuffling and restarting

    // Save quiz state before leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('quizCurrentQuestionIndex', currentQuestionIndex);
        localStorage.setItem('quizScore', score);
        localStorage.setItem('quizCompleted', quizCompleted);
    });


});

// Initialize hamburger menu after header is loaded
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    console.log('Initializing hamburger menu...', { hamburger, navMenu, navBackdrop });

    if (hamburger && navMenu && navBackdrop) {
        // Ensure menu is closed by default
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Remove existing event listeners to prevent duplicates
        hamburger.removeEventListener('click', hamburgerClickHandler);
        navBackdrop.removeEventListener('click', backdropClickHandler);
        navMenu.removeEventListener('click', menuClickHandler);

        // Define event handlers
        function hamburgerClickHandler(event) {
            console.log('Hamburger clicked');
            event.preventDefault();
            event.stopPropagation();

            const isActive = hamburger.classList.contains('active');
            console.log('Hamburger clicked, isActive:', isActive);

            if (isActive) {
                // Close menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navBackdrop.classList.remove('active');
                document.body.classList.remove('menu-open');
                console.log('Menu closed');
            } else {
                // Open menu
                hamburger.classList.add('active');
                navMenu.classList.add('active');
                navBackdrop.classList.add('active');
                document.body.classList.add('menu-open');
                console.log('Menu opened');
            }
        }

        function backdropClickHandler() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('Menu closed via backdrop');
        }

        function menuClickHandler(event) {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                const href = event.target.getAttribute('href');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navBackdrop.classList.remove('active');
                document.body.classList.remove('menu-open');
                console.log('Menu closed via link click');
                // Navigate after closing menu
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        }

        // Add event listeners
        hamburger.addEventListener('click', hamburgerClickHandler);
        navBackdrop.addEventListener('click', backdropClickHandler);
        navMenu.addEventListener('click', menuClickHandler);

        console.log('Hamburger menu initialized successfully');
    } else {
        console.error('Hamburger menu elements not found:', { hamburger, navMenu, navBackdrop });
    }
}

// Helper function for :contains selector
Element.prototype.matches = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector;

function containsText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(element => element.textContent.includes(text));
}

document.querySelectorAll = (function(originalQuerySelectorAll) {
    return function(selector) {
        if (selector.includes(':contains')) {
            const [baseSelector, text] = selector.split(':contains');
            return containsText(baseSelector, text.slice(1, -1));
        }
        return originalQuerySelectorAll.call(this, selector);
    };
})(document.querySelectorAll);




// Page transition functionality
function handlePageTransition(event) {
    // Check if it's a navigation link
    if (event.target.tagName === 'A' && event.target.getAttribute('href') &&
        !event.target.getAttribute('href').startsWith('#') &&
        !event.target.getAttribute('href').startsWith('http')) {

        event.preventDefault();
        const targetUrl = event.target.getAttribute('href');

        // Add fade-out class to body
        document.body.classList.add('page-transition', 'fade-out');

        // Navigate after transition
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 400);
    }
}

// Initialize layout on page load
document.addEventListener('DOMContentLoaded', function() {
    loadLayout();

    // Add transition handlers to navigation links
    document.addEventListener('click', handlePageTransition);

    // Add transition class to main content for initial load
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition', 'fade-in');
    }
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    if (searchInput && searchResults) {
        const topics = [
            { title: 'Dekomposisi', url: 'dekomposisi.html', description: 'Memecah masalah besar menjadi bagian kecil' },
            { title: 'Pola', url: 'pola.html', description: 'Mengenali kemiripan dalam data' },
            { title: 'Abstraksi', url: 'abstraksi.html', description: 'Menyaring informasi penting' },
            { title: 'Algoritma', url: 'algoritma.html', description: 'Urutan langkah-langkah menyelesaikan masalah' },
            { title: 'Quiz', url: 'quiz.html', description: 'Latihan dan evaluasi' }
        ];

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                const filteredTopics = topics.filter(topic =>
                    topic.title.toLowerCase().includes(query) ||
                    topic.description.toLowerCase().includes(query)
                );
                displaySearchResults(filteredTopics);
            } else {
                searchResults.style.display = 'none';
            }
        });

        function displaySearchResults(results) {
            searchResults.innerHTML = '';
            if (results.length > 0) {
                results.forEach(result => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `<strong>${result.title}</strong><br>${result.description}`;
                    item.addEventListener('click', function() {
                        window.location.href = result.url;
                    });
                    searchResults.appendChild(item);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        }

        // Hide search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Scroll animation for topic cards
    const topicCards = document.querySelectorAll('.card');
    if (topicCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delay based on index for staggered animation
                    setTimeout(() => {
                        if (index % 2 === 0) {
                            entry.target.classList.add('animate-left');
                        } else {
                            entry.target.classList.add('animate-right');
                        }
                    }, index * 200); // 200ms delay between each card
                }
            });
        }, observerOptions);

        topicCards.forEach(card => {
            observer.observe(card);
        });
    }
});
