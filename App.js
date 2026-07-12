var questions = [
    {
        question: "Apa singkatan dari REST dalam konteks web application?",
        option1: "Remote Essential State Transfer",
        option2: "Representational State Transfer",
        option3: "Required Encode Storage Transfer",
        option4: "Resource External System Transfer",
        answer: "Representational State Transfer",
    },
    {
        question: "Framework JavaScript mana yang paling populer untuk membangun Single Page Application?",
        option1: "Ruby on Rails",
        option2: "Django",
        option3: "React",
        option4: "Laravel",
        answer: "React",
    },
    {
        question: "Apa keuntungan utama menggunakan localStorage dalam web app?",
        option1: "Mempercepat koneksi internet",
        option2: "Menyimpan data di browser tanpa perlu server",
        option3: "Mengenkripsi semua data pengguna",
        option4: "Menghapus cookie secara otomatis",
        answer: "Menyimpan data di browser tanpa perlu server",
    },
    {
        question: "Apa itu API dalam pengembangan web application?",
        option1: "Antarmuka untuk mengakses data dan fungsi dari aplikasi lain",
        option2: "Aplikasi yang hanya berjalan di server",
        option3: "Database yang menyimpan informasi pengguna",
        option4: "Bahasa pemrograman khusus web",
        answer: "Antarmuka untuk mengakses data dan fungsi dari aplikasi lain",
    },
    {
        question: "Apa perbedaan antara method GET dan POST dalam HTTP?",
        option1: "GET mengirim data terlihat di URL, POST mengirim data tersembunyi",
        option2: "GET lebih cepat dari POST",
        option3: "POST tidak membutuhkan koneksi internet",
        option4: "GET hanya digunakan untuk gambar",
        answer: "GET mengirim data terlihat di URL, POST mengirim data tersembunyi",
    },
    {
        question: "Framework backend mana yang ditulis dengan bahasa JavaScript?",
        option1: "Django",
        option2: "Express.js",
        option3: "Spring Boot",
        option4: "ASP.NET",
        answer: "Express.js",
    },
    {
        question: "Apa tujuan utama dari responsive design dalam web app?",
        option1: "Membuat halaman lebih colorful",
        option2: "Membuat aplikasi terlihat baik di semua ukuran layar",
        option3: "Mempercepat loading halaman",
        option4: "Meningkatkan keamanan data",
        answer: "Membuat aplikasi terlihat baik di semua ukuran layar",
    },
    {
        question: "Apa yang dimaksud dengan Cross-Origin Resource Sharing (CORS)?",
        option1: "Sistem untuk membagi resource antar domain yang berbeda",
        option2: "Cara mengenkripsi data pengguna",
        option3: "Protokol untuk menyimpan cookie",
        option4: "Metode untuk menghapus cache browser",
        answer: "Sistem untuk membagi resource antar domain yang berbeda",
    },
    {
        question: "Library mana yang digunakan untuk membuat chart dan visualisasi data di web app?",
        option1: "Chart.js",
        option2: "jQuery",
        option3: "Bootstrap",
        option4: "Webpack",
        answer: "Chart.js",
    },
    {
        question: "Apa itu progressive web app (PWA)?",
        option1: "Aplikasi web yang bekerja offline dan dapat diunduh ke home screen",
        option2: "Website yang hanya bisa diakses di desktop",
        option3: "Aplikasi yang memerlukan server premium",
        option4: "Tipe database yang sangat cepat",
        answer: "Aplikasi web yang bekerja offline dan dapat diunduh ke home screen",
    },
];

var startBtn = document.querySelector(".startBtn");
var login_form = document.querySelector(".login_form");
var emailPass = document.querySelector(".emailPass");
var hideBtn = document.querySelector(".hideBtn");
var userEmail = document.getElementById("uEmail");
var userPass = document.getElementById("uPass");
var infoBox = document.querySelector(".info_box");
var quizStart = document.querySelector(".quiz_container");
var resultbox = document.querySelector(".result_box");
var scoreText = document.querySelector(".score_text");
var inputs = document.querySelector(".inputs");
var links = document.querySelector(".links");
var progressbar = document.getElementById("progressBar");
var form = document.getElementById("form");
var countDown = document.getElementById("timer");
var index = 0; // Question Counting
var score = 0; // User Correct Question Score
var counter; // counter of timer
var timeValue = 180; // timer value

// Registration Form
var singUpName = document.getElementById("sName");
var singUpEmail = document.getElementById("sEmail");
var singUpPass = document.getElementById("sPass");

function submitForm(){
    event.preventDefault();
    var registerUser = {
        name: singUpName.value,
        email: singUpEmail.value,
        password: singUpPass.value,
    }

    console.log("registerUser",registerUser)

    localStorage.setItem("registerUser", JSON.stringify(registerUser));
    window.location.href = "./index.html"
}

// get data user to localStorage
var getUserData = localStorage.getItem("registerUser");
getUserData = getUserData ? JSON.parse(getUserData) : null;

// login form
function loginForm(){
    if (!getUserData) {
        const Toast = Swal.mixin({
            toast:true,
            position:"top",
            showConfirmButton:true,
        })
        Toast.fire({
            title:"<h2>Selamat datang!</h2> Silahkan daftarkan akun anda"
        })
        return;
    }

    var getEmail = getUserData.email;
    var getPass = getUserData.password;

    if (userEmail.value == getEmail && userPass.value == getPass) {
        infoBox.style.display = "block";
        login_form.style.display = "none";
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Berhasil Masuk",
        });
    } else {
        const Toast = Swal.mixin({
            toast:true,
            position:"top",
            showConfirmButton:false,
            timer:1000,
        })
        Toast.fire({
            icon:"warning",
            title:"<h2>Invalid email or password</h2>"
        })
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// quit quiz
function quit(){
    location.reload();
}

// masuk quiz
function enterQuiz(){
    infoBox.style.display = "none"
    startBtn.style.display = "block"
}

// tampilkan pertanyaan
function renderQuestions(){
    var question = document.getElementById("qustionsContainer");
    var options = document.getElementsByName("options");
    var qustionNo = document.getElementById("qustionNo");
    clearInterval(counter);
    startTimer(timeValue);

    if (index > 0) {
        var selectedOption = document.querySelector('input[name="options"]:checked');
        if (selectedOption && selectedOption.value === questions[index - 1].answer) {
            score++;
        }
    }

    var totalQuestions = questions.length;
    var percetage = (score / totalQuestions) * 100;
    window.addEventListener("blur", () => {
        clearInterval(counter);
        resultbox.style.display = "flex";
        quizStart.style.display = "none";

        if (score === 0) {
            scoreText.innerHTML = `
            <span style="text-align: center; margin: 5px 0; font-size: 22px;">
            Anda dilarang untuk keluar dari aplikasi kuis, anda didiskualifikasi 🖐️ <span>
            `;
        } else {
            var progressbar = document.querySelector(".progressBar");
            if (progressbar) {
                progressbar.innerHTML = `
                <p>${percetage}%</p>
                `;
            }
            scoreText.innerHTML = `
            <span>Score: <p>${score}</p>out of<p>${totalQuestions}</p><span>
        `;
        }
    });

    if (!questions[index]) {
        clearInterval(counter);
        resultbox.style.display = "flex";
        quizStart.style.display = "none";
    
        scoreText.innerHTML = `
        <span>Score: <p>${score}</p>out of<p>${totalQuestions}</p><span>
        `;
    
        var circularProgress = document.querySelector(".circular-progress"),
        progressValue = document.querySelector(".progress-value");
    
        var progressStartValue = 0,
        progressEndValue = percetage,
        speed = 25;
    
        var progress = setInterval(() => {
          progressStartValue++;
    
          progressValue.textContent = `${progressStartValue}%`;
          circularProgress.style.background = `conic-gradient(var(--primaryColor) ${
            progressStartValue * 3.6
          }deg, #ededed 0deg)`;
    
          if (progressStartValue == progressEndValue) {
            clearInterval(progress);
          }
        }, speed);

        return;
    }

    var number = index+1;

    var questionValue = questions[index];
    question.innerHTML = `
        <div id="qustions">
            <span>${number}</span>
            <p>${escapeHtml(questionValue.question)}</p>
        </div>
        <div class="options_list">
            <label for="options1" class="options"><input type="radio" id="options1" name="options" value="${escapeHtml(questionValue.option1)}">${escapeHtml(questionValue.option1)}<span class="checkmark"></span></label>
            <label for="options2" class="options"><input type="radio" id="options2" name="options" value="${escapeHtml(questionValue.option2)}">${escapeHtml(questionValue.option2)}<span class="checkmark"></span></label>
            <label for="options3" class="options"><input type="radio" id="options3" name="options" value="${escapeHtml(questionValue.option3)}">${escapeHtml(questionValue.option3)}<span class="checkmark"></span></label>
            <label for="options4" class="options"><input type="radio" id="options4" name="options" value="${escapeHtml(questionValue.option4)}">${escapeHtml(questionValue.option4)}<span class="checkmark"></span></label>
        </div>
    `

    index++;
    qustionNo.innerHTML = index;
}

// timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        countDown.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            renderQuestions();
        }
    }
}

// start kuis
function startQuiz(){
    quizStart.style.display = "block";
    startBtn.style.display = "none";
    renderQuestions();

    // set page full screen when start quiz
    document.documentElement.requestFullscreen();
}