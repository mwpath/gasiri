document.write(`
<section id="nwFooter" aria-label="Global Footer">
  <style>
    /* ================= Scope: #nwFooter only ================= */
    #nwFooter{
      --ink:#ffffff;
      --muted:rgba(255,255,255,.72);
      --muted-2:rgba(255,255,255,.56);
      --accent:#c7d66b;
      --olive:#6a8b2e;
      --bg:#0f1112;
      --chip:#151819;
      --line:rgba(255,255,255,.10);
      --line-strong:rgba(255,255,255,.14);
      --radius:16px;
      --shadow:0 10px 28px rgba(0,0,0,.35);
      font-family:Pretendard,"Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
      background:
        radial-gradient(1200px 600px at 15% 0%, rgba(199,214,107,.08), transparent 50%),
        radial-gradient(800px 500px at 90% 10%, rgba(106,139,46,.06), transparent 55%),
        var(--bg);
      color:var(--ink);
      position:relative;
      padding:72px 20px 26px;
      overflow:hidden;
      isolation:isolate;
    }

    #nwFooter::before{
      content:"";
      position:absolute;
      inset:auto -10% 0 -10%;
      height:180px;
      z-index:-1;
      background:linear-gradient(to top, rgba(199,214,107,.07), transparent 60%);
      filter:blur(8px);
      opacity:.8;
    }

    #nwFooter .inner{
      max-width:1280px;
      margin:0 auto;
    }

    /* 상단 */
    #nwFooter .top{
      display:grid;
      grid-template-columns:minmax(300px, 420px) minmax(0, 1fr);
      gap:64px;
      align-items:start;
    }

    /* 브랜드 영역 */
    #nwFooter .brand{
      display:flex;
      flex-direction:column;
      gap:18px;
    }

    #nwFooter .logo{
      display:inline-flex;
      align-items:center;
      text-decoration:none;
      color:#fff;
      width:max-content;
    }

    #nwFooter .logo img{
      width:min(240px, 62vw);
      height:auto;
      display:block;
      filter:drop-shadow(0 4px 14px rgba(0,0,0,.28));
    }

    #nwFooter .tagline{
      margin:0;
      color:var(--muted);
      line-height:1.85;
      font-size:15px;
      word-break:keep-all;
    }

    #nwFooter .chips{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin-top:4px;
    }

    #nwFooter .chip{
      display:inline-flex;
      align-items:center;
      min-height:40px;
      padding:0 14px;
      border-radius:999px;
      background:rgba(255,255,255,.035);
      border:1px solid var(--line);
      color:#fff;
      font-size:13px;
      backdrop-filter:blur(4px);
    }

    /* 사이트맵 */
    #nwFooter .sitemap{
      display:grid;
      grid-template-columns:repeat(4, minmax(0,1fr));
      gap:28px 26px;
      padding-top:6px;
    }

    #nwFooter .menu-group{
      min-width:0;
    }

    #nwFooter .menu-title{
      display:block;
      margin:0 0 14px;
      color:#fff;
      font-size:15px;
      font-weight:700;
      line-height:1.4;
      word-break:keep-all;
    }

    #nwFooter .menu-list{
      list-style:none;
      margin:0;
      padding:0;
    }

    #nwFooter .menu-list li{
      margin:0 0 8px;
    }

    #nwFooter .menu-list a{
      color:var(--muted);
      text-decoration:none;
      font-size:14px;
      line-height:1.7;
      transition:color .2s ease, transform .2s ease, opacity .2s ease;
      display:inline-block;
      word-break:keep-all;
    }

    #nwFooter .menu-list a::before{
      content:"– ";
      opacity:.7;
    }

    #nwFooter .menu-list a:hover{
      color:var(--olive);
      transform:translateX(2px);
    }

    #nwFooter .hr{
      height:1px;
      background:linear-gradient(90deg, transparent, var(--line-strong), transparent);
      margin:42px 0 20px;
    }

    /* 하단 바 */
    #nwFooter .bottom{
      display:grid;
      grid-template-columns:1fr auto auto;
      align-items:center;
      gap:20px;
    }

    #nwFooter .copy{
      color:var(--muted-2);
      font-size:13px;
      line-height:1.6;
    }

    #nwFooter .policy-links{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      gap:18px;
    }

    #nwFooter .policy-links a{
      color:var(--muted);
      text-decoration:none;
      font-size:13px;
      transition:color .2s ease;
    }

    #nwFooter .policy-links a:hover{
      color:var(--olive);
    }

    #nwFooter .sns{
      display:flex;
      align-items:center;
      gap:10px;
      justify-content:flex-end;
    }

    #nwFooter .sns a{
      display:grid;
      place-items:center;
      width:40px;
      height:40px;
      border-radius:50%;
      background:rgba(255,255,255,.05);
      color:#fff;
      border:1px solid var(--line);
      text-decoration:none;
      font-size:16px;
      transition:transform .2s ease, background .2s ease, border-color .2s ease;
    }

    #nwFooter .sns a:hover{
      transform:translateY(-2px);
      background:rgba(255,255,255,.10);
      border-color:rgba(255,255,255,.18);
    }

    @media (max-width:1100px){
      #nwFooter .top{
        grid-template-columns:1fr;
        gap:42px;
      }

      #nwFooter .sitemap{
        grid-template-columns:repeat(2, minmax(0,1fr));
      }

      #nwFooter .bottom{
        grid-template-columns:1fr;
        justify-items:start;
      }

      #nwFooter .policy-links{
        justify-content:flex-start;
      }

      #nwFooter .sns{
        justify-content:flex-start;
      }
    }

    @media (max-width:700px){
      #nwFooter{
        padding:56px 16px 24px;
      }

      #nwFooter .top{
        gap:34px;
      }

      #nwFooter .logo img{
        width:min(200px, 60vw);
      }

      #nwFooter .tagline{
        font-size:14px;
        line-height:1.8;
      }

      #nwFooter .chips{
        gap:8px;
      }

      #nwFooter .chip{
        min-height:38px;
        font-size:12.5px;
        padding:0 12px;
      }

      /* 모바일에서 메뉴 2열 */
      #nwFooter .sitemap{
        grid-template-columns:repeat(2, minmax(0,1fr));
        gap:28px 18px;
        align-items:start;
      }

      #nwFooter .menu-title{
        margin-bottom:10px;
        font-size:14.5px;
      }

      #nwFooter .menu-list a{
        font-size:13.5px;
        line-height:1.65;
      }

      #nwFooter .hr{
        margin:34px 0 18px;
      }

      #nwFooter .bottom{
        gap:14px;
      }

      #nwFooter .copy,
      #nwFooter .policy-links a{
        font-size:12.5px;
      }

      #nwFooter .policy-links{
        gap:14px;
      }

      #nwFooter .sns a{
        width:38px;
        height:38px;
      }
    }

    @media (max-width:480px){
      /* 아주 작은 모바일에서도 2열 유지 */
      #nwFooter .sitemap{
        grid-template-columns:repeat(2, minmax(0,1fr));
        gap:24px 14px;
      }

      #nwFooter .menu-title{
        font-size:14px;
      }

      #nwFooter .menu-list a{
        font-size:13px;
      }

      #nwFooter .chip{
        width:max-content;
      }
    }

    @media (prefers-reduced-motion:reduce){
      #nwFooter .menu-list a,
      #nwFooter .policy-links a,
      #nwFooter .sns a{
        transition:none !important;
      }
    }
  </style>

  <div class="inner">
    <div class="top">
      <div class="brand">
        <a href="#" class="logo" aria-label="홈으로">
          <img src="./img/logo-w.png" alt="Brand Logo">
        </a>

        <p class="tagline">
          사람과 자연의 회복을 위한 활동과 교육, 그리고 관계의 숲을 가꾸는 여정.<br>
          우리는 자연과 함께 성장합니다.
        </p>

        <div class="chips" aria-label="Contact chips">
          <span class="chip">Tel. 02-000-0000</span>
          <span class="chip">Email. hello@domain.com</span>
          <span class="chip">Mon–Fri 10:00–18:00</span>
        </div>
      </div>

      <nav class="sitemap" aria-label="Footer Sitemap">
        <div class="menu-group">
          <strong class="menu-title">소개&미션</strong>
          <ul class="menu-list">
            <li><a href="./introduce.html">우리는</a></li>
            <li><a href="./history.html">활동 연혁</a></li>
            <li><a href="./team.html">함께하는 사람들</a></li>
            <li><a href="./location.html">오시는 길</a></li>
          </ul>
        </div>

        <div class="menu-group">
          <strong class="menu-title">자연과 회복</strong>
          <ul class="menu-list">
            <li><a href="./nature.html">자연과 회복</a></li>
          </ul>
        </div>

        <div class="menu-group">
          <strong class="menu-title">프로그램 소개</strong>
          <ul class="menu-list">
            <li><a href="./kids-program.html">어린이 숲</a></li>
            <li><a href="./expert-program.html">전문가 숲</a></li>
          </ul>
        </div>

        <div class="menu-group">
          <strong class="menu-title">진행 중인 프로그램</strong>
          <ul class="menu-list">
            <li><a href="./program.html">세부 프로그램</a></li>
            <li><a href="./calender.html">연간 프로그램</a></li>
            <li><a href="./contact.html">참여 및 문의</a></li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="hr"></div>

    <div class="bottom">
      <div class="copy">
        © <span id="nwFooterYear"></span> 생태명상 & 가시리 포레스트. All Rights Reserved.
      </div>

      <div class="policy-links">
        <a href="#policy">개인정보처리방침</a>
        <a href="#terms">이용약관</a>
        <a href="#contact">고객센터</a>
      </div>

      <div class="sns">
        <a href="#" title="YouTube" aria-label="YouTube">▶</a>
        <a href="#" title="Instagram" aria-label="Instagram">◎</a>
        <a href="#" title="Facebook" aria-label="Facebook">f</a>
      </div>
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function(){
    var yearEl = document.getElementById('nwFooterYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  });
</script>
`);