// ./js/menu.js
(function () {
  // 1) 헤더 전체 HTML 템플릿 (#nbbioHeaderLocal + 스타일 + 구조)
  const HEADER_TEMPLATE = `
<section id="nbbioHeaderLocal" aria-label="NBBIO Global Navigation">
  <style>
    /* ============== Scope: #nbbioHeaderLocal only ============== */
    #nbbioHeaderLocal{
      --ink:#0b1220;
      --muted:#3b3f45;
      --brand:#0a6a62;
      --line:#e8ecef;
      --bg:#f6f7f8;
      --white:#fff;
      --overlay:rgba(0,0,0,.55);
      --z:20000;
      --shadow:0 12px 30px rgba(16,24,40,.12);
      --green:#098940;
      --yellow:#fbed33;
      font-family:Pretendard,"Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
      position:relative;
      z-index:100;
    }

    /* Header bar */
    #nbbioHeaderLocal .bar{
      position:fixed;top:0;left:0;right:0;
      z-index:var(--z);
      background:var(--green);
      border-bottom:1px solid var(--green);
      transition:transform .3s ease, background-color .26s ease, border-color .26s ease;
    }
    #nbbioHeaderLocal.scroll-down .bar{transform:translateY(-100%);}
    #nbbioHeaderLocal.scroll-up .bar{transform:translateY(0);}
    #nbbioHeaderLocal.at-top .bar{background:transparent;border-color:transparent;}

    #nbbioHeaderLocal.at-top .bar:hover{
      background:var(--green);
      border-bottom:1px solid var(--green);
    }
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li>a{color:#fff;}
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li:hover>a,
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li:focus-within>a,
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li.is-on>a{color:yellow;}
    #nbbioHeaderLocal.at-top .bar:hover .globeBtn{
      background:var(--green);
      border-bottom:1px solid var(--green);
    }
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn{
      background:var(--green);
      border-color:#e8ecef63;
    }
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn i,
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn i::before,
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn i::after{background:#ffffff;}
    #nbbioHeaderLocal.at-top .bar:hover .globeBtn svg circle,
    #nbbioHeaderLocal.at-top .bar:hover .globeBtn svg path{stroke:#0b1220;}

    #nbbioHeaderLocal.at-top.hovering .bar{
      background:var(--green);
      border-color:var(--green);
    }
    #nbbioHeaderLocal.at-top.hovering .gnb>li>a{color:var(--ink);}
    #nbbioHeaderLocal.at-top.hovering .gnb>li:hover>a,
    #nbbioHeaderLocal.at-top.hovering .gnb>li:focus-within>a,
    #nbbioHeaderLocal.at-top.hovering .gnb>li.is-on>a{color:#fcf179;}
    #nbbioHeaderLocal.at-top.hovering .globeBtn,
    #nbbioHeaderLocal.at-top.hovering .menuBtn{
      background:var(--white);
      border-color:var(--line);
    }
    #nbbioHeaderLocal.at-top.hovering .menuBtn i,
    #nbbioHeaderLocal.at-top.hovering .menuBtn i::before,
    #nbbioHeaderLocal.at-top.hovering .menuBtn i::after{background:#111;}
    #nbbioHeaderLocal.at-top.hovering .globeBtn svg circle,
    #nbbioHeaderLocal.at-top.hovering .globeBtn svg path{stroke:#0b1220;}

    #nbbioHeaderLocal .wrap{
      max-width:1820px;
      margin:0 auto;
      padding:16px 20px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:14px;
    }
    #nbbioHeaderLocal .logo img{display:block;height:36px;width:auto;}

    /* GNB */
    #nbbioHeaderLocal nav{display:flex;gap:24px;flex-direction:column;}
    #nbbioHeaderLocal .gnb{display:flex;gap:76px;margin:0;padding:0;}
    #nbbioHeaderLocal .gnb>li{list-style:none;position:relative;}
    #nbbioHeaderLocal .gnb>li>a{
      display:block;
      padding:10px 6px;
      font-weight:700;
      color:#fff;
      letter-spacing:-.2px;
      text-decoration:none;
      transition:color .26s ease;
    }
    #nbbioHeaderLocal .gnb>li:hover>a,
    #nbbioHeaderLocal .gnb>li:focus-within>a,
    #nbbioHeaderLocal .gnb>li.is-on>a{color:var(--yellow);}

    #nbbioHeaderLocal.at-top .gnb>li>a{color:#fff;}
    #nbbioHeaderLocal.at-top .gnb>li:hover>a,
    #nbbioHeaderLocal.at-top .gnb>li:focus-within>a,
    #nbbioHeaderLocal.at-top .gnb>li.is-on>a{color:#fff;}

    #nbbioHeaderLocal .dep2{
      position:absolute;
      left:0;
      top:100%;
      min-width:190px;
      border:1px solid var(--line);
      border-radius:10px;
      background:#fff;
      box-shadow:var(--shadow);
      overflow:hidden;
      transform-origin:0 0;
      transform:scale(.98) translateY(6px);
      opacity:0;
      visibility:hidden;
      transition:transform .18s ease,opacity .18s ease,visibility .18s ease;
    }
    #nbbioHeaderLocal .dep2 a{
      display:block;
      padding:11px 14px;
      color:var(--ink);
      white-space:nowrap;
      font-size:14px;
      text-decoration:none;
    }
    #nbbioHeaderLocal .dep2 a:hover{
      background:#f7fafc;
      color:yellow;
    }
    #nbbioHeaderLocal .gnb>li:hover .dep2,
    #nbbioHeaderLocal .gnb>li:focus-within .dep2{
      opacity:1;
      visibility:visible;
      transform:scale(1) translateY(0);
    }

    /* Right actions */
    #nbbioHeaderLocal .actions{
      display:flex;
      align-items:center;
      gap:12px;
    }
    #nbbioHeaderLocal .globeBtn{
      width:36px;
      height:36px;
      border:1px solid var(--line);
      border-radius:10px;
      background:var(--white);
      display:grid;
      place-items:center;
      cursor:pointer;
      transition:background-color .26s ease, border-color .26s ease;
      display:none;
    }

    /* 기본값: 햄버거 숨김 */
    #nbbioHeaderLocal .menuBtn{
      width:42px;
      height:36px;
      border:1px solid var(--line);
      border-radius:10px;
      background:var(--green);
      cursor:pointer;
      position:relative;
      transition:background-color .26s ease, border-color .26s ease;
      display:none;
    }
    #nbbioHeaderLocal .menuBtn i,
    #nbbioHeaderLocal .menuBtn i::before,
    #nbbioHeaderLocal .menuBtn i::after{
      content:"";
      position:absolute;
      left:8px;
      right:8px;
      height:2px;
      background:#ffffff;
      transition:.24s ease;
    }
    #nbbioHeaderLocal .menuBtn i{top:50%;transform:translateY(-50%);}
    #nbbioHeaderLocal .menuBtn i::before{top:-8px;}
    #nbbioHeaderLocal .menuBtn i::after{top:8px;}
    #nbbioHeaderLocal .menuBtn[aria-expanded="true"] i{background:transparent;}
    #nbbioHeaderLocal .menuBtn[aria-expanded="true"] i::before{top:0;transform:rotate(45deg);}
    #nbbioHeaderLocal .menuBtn[aria-expanded="true"] i::after{top:0;transform:rotate(-45deg);}

    #nbbioHeaderLocal.at-top .globeBtn{
      background:rgba(255,255,255,.12);
      border-color:rgba(255,255,255,.4);
    }
    #nbbioHeaderLocal.at-top .menuBtn{
      background:rgba(255,255,255,.12);
      border-color:rgba(255,255,255,.4);
    }
    #nbbioHeaderLocal.at-top .menuBtn i,
    #nbbioHeaderLocal.at-top .menuBtn i::before,
    #nbbioHeaderLocal.at-top .menuBtn i::after{background:#fff;}
    #nbbioHeaderLocal.at-top .globeBtn svg circle,
    #nbbioHeaderLocal.at-top .globeBtn svg path{stroke:#fff;}

    #nbbioHeaderLocal .down{
      transform-origin:top;
      transform:scaleY(0);
      transition:transform .18s ease;
      background:#fff;
      border-bottom:1px solid var(--line);
    }
    #nbbioHeaderLocal .header.act .down{transform:scaleY(1);}

    /* ===================== HOVER LIGHT PANEL (PC) ===================== */
    #nbbioHeaderLocal .megalite{
      position:absolute;
      left:0;
      right:0;
      top:100%;
      background:var(--green);
      border-bottom:1px solid var(--green);
      box-shadow:var(--shadow);
      opacity:0;
      transform:translateY(-6px);
      visibility:hidden;
      pointer-events:none;
      transition:opacity .26s ease, transform .26s ease, visibility .26s ease;
    }
    #nbbioHeaderLocal .megalite.act{
      opacity:1;
      transform:translateY(0);
      visibility:visible;
      pointer-events:auto;
    }
    #nbbioHeaderLocal .megalite .inner{
      max-width:1440px;
      margin:0 auto;
      padding:24px 40px 28px;
    }
    #nbbioHeaderLocal .megalite .grid{
      display:grid;
      grid-template-columns:repeat(4,minmax(160px,1fr));
      gap:60px;
    }
    #nbbioHeaderLocal .megalite h4{
      margin:0 0 10px;
      font-size:18px;
      letter-spacing:-.2px;
      color:#fff;
      font-weight:800;
    }
    #nbbioHeaderLocal .megalite ul{margin:0;padding:0;list-style:none;}
    #nbbioHeaderLocal .megalite li a{
      display:block;
      padding:6px 0;
      color:#fff;
      text-decoration:none;
    }
    #nbbioHeaderLocal .megalite li a:hover{color:yellow;}

    /* ===================== MEGA MENU (PC) ===================== */
    #nbbioHeaderLocal .mega{
      position:fixed;
      inset:0;
      display:block;
      z-index:var(--z);
      pointer-events:none;
      visibility:hidden;
    }
    #nbbioHeaderLocal .mega .scrim{
      position:absolute;
      inset:0;
      background:var(--overlay);
      opacity:0;
      transition:opacity .28s ease;
    }
    #nbbioHeaderLocal .mega .panel{
      position:absolute;
      inset:0;
      background:#f5f6f7;
      opacity:0;
      transform:translateY(-10px);
      transition:opacity .32s ease,transform .32s ease;
    }
    #nbbioHeaderLocal .mega .inner{
      max-width:1440px;
      margin:0 auto;
      padding:80px 40px 60px;
      height:100%;
      display:flex;
      flex-direction:column;
    }
    #nbbioHeaderLocal .mega .topline{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      padding-bottom:20px;
    }
    #nbbioHeaderLocal .mega .topline .brand{
      display:flex;
      align-items:center;
      gap:12px;
    }
    #nbbioHeaderLocal .mega .topline .brand img{height:32px;}
    #nbbioHeaderLocal .mega .icons{
      display:flex;
      gap:16px;
      align-items:center;
    }
    #nbbioHeaderLocal .mega .iconBtn{
      width:36px;
      height:36px;
      border:1px solid var(--line);
      border-radius:10px;
      background:var(--white);
      display:grid;
      place-items:center;
      cursor:pointer;
    }
    #nbbioHeaderLocal .mega .grid{
      display:grid;
      grid-template-columns:repeat(4,minmax(200px,1fr));
      gap:60px;
      margin-top:40px;
    }
    #nbbioHeaderLocal .mega .col h3{
      font-size:28px;
      line-height:1.2;
      letter-spacing:-.4px;
      font-weight:900;
      color:#111;
      margin:0 0 18px;
    }
    #nbbioHeaderLocal .mega .col ul{margin:0;padding:0;list-style:none;}
    #nbbioHeaderLocal .mega .col li a{
      display:block;
      padding:10px 0;
      color:#111;
      text-decoration:none;
      font-size:16px;
    }
    #nbbioHeaderLocal .mega .col li a:hover{color:var(--brand);}
    #nbbioHeaderLocal .mega .watermark{
      position:absolute;
      right:40px;
      bottom:34px;
      opacity:.08;
    }
    #nbbioHeaderLocal .mega .watermark svg{width:220px;height:auto;}
    #nbbioHeaderLocal .mega.act{visibility:visible;pointer-events:auto;}
    #nbbioHeaderLocal .mega.act .scrim{opacity:1;}
    #nbbioHeaderLocal .mega.act .panel{
      opacity:1;
      transform:translateY(0);
    }

    /* ===================== MOBILE DRAWER ===================== */
    #nbbioHeaderLocal .overlay{
      position:fixed;
      inset:0;
      background:var(--overlay);
      display:none;
      z-index:calc(var(--z) - 1);
    }
    #nbbioHeaderLocal .overlay.act{display:block;}

    #nbbioHeaderLocal .drawer{
      position:fixed;
      inset:0 0 0 auto;
      width:min(480px,94vw);
      background:var(--green);
      transform:translateX(100%);
      transition:transform .26s ease;
      z-index:var(--z);
      display:flex;
      flex-direction:column;
      height:100dvh;
      height:100vh;
      color:#fff;
    }
    #nbbioHeaderLocal .drawer.act{transform:translateX(0);}

    #nbbioHeaderLocal .drawer .top{
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:18px 16px;
      border-bottom:1px solid rgba(255,255,255,.18);
      background:var(--green);
      flex:0 0 auto;
    }
    #nbbioHeaderLocal .drawer .top .brand{
      display:flex;
      align-items:center;
      gap:10px;
    }
    #nbbioHeaderLocal .drawer .top .brand img{height:28px;}

    #nbbioHeaderLocal .drawer .top .globeBtn{
      background:rgba(255,255,255,.12);
      border-color:rgba(255,255,255,.28);
    }
    #nbbioHeaderLocal .drawer .top .globeBtn svg circle,
    #nbbioHeaderLocal .drawer .top .globeBtn svg path{
      stroke:#fff;
    }

    #nbbioHeaderLocal .drawer .top .closeDrawer{
      width:36px;
      height:36px;
      border:1px solid rgba(255,255,255,.28) !important;
      border-radius:10px;
      background:rgba(255,255,255,.12) !important;
      display:grid;
      place-items:center;
      cursor:pointer;
    }
    #nbbioHeaderLocal .drawer .top .closeDrawer svg path{
      stroke:#fff;
    }

    #nbbioHeaderLocal .mnav{
      padding:6px 18px 32px;
      overflow:auto;
      -webkit-overflow-scrolling:touch;
      flex:1 1 auto;
      min-height:0;
      color:#fff;
      background:var(--green);
    }
    #nbbioHeaderLocal .mnav details{
      border-bottom:1px solid rgba(255,255,255,.14);
    }
    #nbbioHeaderLocal .mnav summary{
      list-style:none;
      display:flex;
      align-items:center;
      justify-content:space-between;
      cursor:pointer;
      padding:18px 6px;
      font-weight:700;
      font-size:20px;
      color:#fff;
      transition:color .22s ease;
    }
    #nbbioHeaderLocal .mnav summary:hover{
      color:var(--yellow);
    }
    #nbbioHeaderLocal .mnav summary::-webkit-details-marker{display:none;}
    #nbbioHeaderLocal .mnav summary .chev{
      width:10px;
      height:10px;
      border-right:2px solid #fff;
      border-bottom:2px solid #fff;
      transform:rotate(45deg);
      transition:.28s;
      margin-left:8px;
      flex:0 0 10px;
    }
    #nbbioHeaderLocal .mnav details:hover summary .chev{
      border-right-color:var(--yellow);
      border-bottom-color:var(--yellow);
    }
    #nbbioHeaderLocal .mnav details[open] summary .chev{transform:rotate(-135deg);}

    #nbbioHeaderLocal .gs2{
      max-height:0;
      overflow:hidden;
      transition:max-height .32s ease;
      padding:0 0 0 16px;
    }
    #nbbioHeaderLocal details[open] .gs2{padding:4px 0 14px 16px;}
    #nbbioHeaderLocal .gs2 a{
      display:block;
      padding:14px 2px;
      color:#fff;
      font-size:18px;
      text-decoration:none;
      transition:color .22s ease;
    }
    #nbbioHeaderLocal .gs2 a:hover{color:var(--yellow);}

    /* 브레이크포인트 */
    @media (max-width:1279.98px){
      #nbbioHeaderLocal .bar nav{display:none;}
      #nbbioHeaderLocal .megalite{display:none!important;}
      #nbbioHeaderLocal .mega{display:none!important;}
      #nbbioHeaderLocal .menuBtn{display:block;}
    }
    @media (min-width:1280px){
      #nbbioHeaderLocal .dep2{display:none!important;}
      #nbbioHeaderLocal .menuBtn{display:none!important;}
    }
  </style>

  <!-- ====== Header Bar (+ 라이트 패널 컨테이너) ====== -->
  <div class="bar header">
    <div class="wrap">
      <a class="logo" href="./index.html"><img src="./img/logo-w.png" alt="FLOS"></a>

      <nav aria-label="주 메뉴">
        <ul class="gnb" role="menubar">
          <li role="none" data-col="0">
            <a role="menuitem" href="./introduce.html">소개&미션</a>
            <ul class="dep2" role="menu">
              <li><a href="./introduce.html">우리는</a></li>
              <li><a href="./history.html">활동 연혁</a></li>
              <li><a href="./team.html">함께하는 사람들</a></li>
            </ul>
          </li>

          <li role="none" data-col="1">
            <a role="menuitem" href="./nature.html">자연과 회복</a>
            <ul class="dep2" role="menu">
              <li><a href="./nature.html">온라인 비즈니스 자연과 회복</a></li>
              <li><a href="./nature.html?cat=innovation">비즈니스 혁신</a></li>
              <li><a href="./nature.html?cat=insight">산업 인사이트</a></li>
              <li><a href="./nature.html?cat=ceo">CEO 인사이트</a></li>
            </ul>
          </li>

          <li role="none" data-col="2">
            <a role="menuitem" href="./consult.html">프로그램 소개</a>
            <ul class="dep2" role="menu">
              <li><a href="./kids-program.html">어린이 숲 프로그램</a></li>
              <li><a href="./expert-program.html">전문가 숲 프로그램</a></li>
            </ul>
          </li>

          <li role="none" data-col="3">
            <a role="menuitem" href="./location.html">진행 중인 프로그램</a>
            <ul class="dep2" role="menu">
              <li><a href="./program.html">세부 프로그램</a></li>
              <li><a href="./nature.html">연간 프로그램</a></li>
              <li><a href="./nature.html">참여 및 문의</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="actions">
        <button class="globeBtn" type="button" aria-label="언어">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="#0b1220" stroke-width="1.7"/>
            <path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18" fill="none" stroke="#0b1220" stroke-width="1.2"/>
          </svg>
        </button>
        <button class="menuBtn" type="button" aria-label="전체 메뉴 열기" aria-expanded="false"><i></i></button>
      </div>
    </div>

    <!-- ===== PC Hover 라이트 패널 (4열) ===== -->
    <div class="megalite" aria-hidden="true">
      <div class="inner">
        <div class="grid">
          <div>
            <h4>소개&미션</h4>
            <ul>
              <li><a href="./introduce.html">우리는</a></li>
              <li><a href="./history.html">활동 연혁</a></li>
              <li><a href="./team.html">함께하는 사람들</a></li>
              <li><a href="./location.html">오시는 길</a></li>
            </ul>
          </div>

          <div>
            <h4>자연과 회복</h4>
            <ul>
              <li><a href="./nature.html">자연과 회복</a></li>
            </ul>
          </div>

          <div>
            <h4>프로그램 소개</h4>
            <ul>
              <li><a href="./kids-program.html">어린이 숲 프로그램</a></li>
              <li><a href="./expert-program.html">전문가 숲 프로그램</a></li>
            </ul>
          </div>

          <div>
            <h4>진행 중인 프로그램</h4>
            <ul>
              <li><a href="./program.html">세부 프로그램</a></li>
              <li><a href="./nature.html">연간 프로그램</a></li>
              <li><a href="./nature.html">참여 및 문의</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== Hover bottom bar ===== -->
  <div class="down"></div>

  <!-- ===== 햄버거: 풀스크린 메가메뉴 (PC, 4열) ===== -->
  <aside class="mega" aria-hidden="true">
    <div class="scrim" data-close="mega"></div>
    <div class="panel">
      <div class="inner">
        <div class="topline">
          <div class="brand">
            <img src="./img/logo-w.png" alt="FLOS" />
            <span style="font-weight:800;color:#0a6a62;letter-spacing:.4px;"></span>
          </div>
          <div class="icons">
            <button class="iconBtn" type="button" aria-label="언어">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="#0b1220" stroke-width="1.7"/>
                <path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18" fill="none" stroke="#0b1220" stroke-width="1.2"/>
              </svg>
            </button>
            <button class="iconBtn closeMega" type="button" aria-label="닫기">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="#111" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <hr style="border:none;border-top:1px solid var(--line);margin:10px 0 40px;" />

        <div class="grid" role="menu">
          <div class="col" data-col="0">
            <h3>소개&미션</h3>
            <ul>
              <li><a href="./introduce.html">우리는</a></li>
              <li><a href="./history.html">활동 연혁</a></li>
              <li><a href="./team.html">함께하는 사람들</a></li>
              <li><a href="./location.html">오시는 길</a></li>
            </ul>
          </div>

          <div class="col" data-col="1">
            <h3>자연과 회복</h3>
            <ul>
              <li><a href="./nature.html">자연과 회복</a></li>
            </ul>
          </div>

          <div class="col" data-col="2">
            <h3>프로그램 소개</h3>
            <ul>
              <li><a href="./kids-program.html">어린이 숲 프로그램</a></li>
              <li><a href="./expert-program.html">전문가 숲 프로그램</a></li>
            </ul>
          </div>

          <div class="col" data-col="3">
            <h3>진행 중인 프로그램</h3>
            <ul>
              <li><a href="./program.html">세부 프로그램</a></li>
              <li><a href="./nature.html">연간 프로그램</a></li>
              <li><a href="./nature.html">참여 및 문의</a></li>
            </ul>
          </div>
        </div>

        <div class="watermark" aria-hidden="true">
          <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 30h40a20 20 0 0 1 0 40H30V30zm12 12v16h20a8 8 0 1 0 0-16H42zm64-12h40a20 20 0 0 1 0 40h-40V30zm12 12v16h20a8 8 0 1 0 0-16h-20zM30 78h40a20 20 0 1 1 0 40H30V78zm12 12v16h20a8 8 0 1 0 0-16H42zm64-12h40a20 20 0 1 1 0 40h-40V78zm12 12v16h20a8 8 0 1 0 0-16h-20z" fill="#0b1220"/>
          </svg>
        </div>
      </div>
    </div>
  </aside>

  <!-- ===== MOBILE: Drawer ===== -->
  <div class="overlay" hidden></div>
  <aside class="drawer" aria-hidden="true" aria-label="모바일 전체 메뉴">
    <div class="top">
      <div class="brand"><a href="./index.html"><img src="./img/logo-w.png" alt="FLOS"></a></div>
      <div style="display:flex;gap:10px;align-items:center;">
        <button class="globeBtn" type="button" aria-label="언어">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="#ffffff" stroke-width="1.7"/>
            <path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18" fill="none" stroke="#ffffff" stroke-width="1.2"/>
          </svg>
        </button>
        <button class="iconBtn closeDrawer" type="button" aria-label="닫기" style="width:36px;height:36px;border:1px solid rgba(255,255,255,.28);border-radius:10px;background:rgba(255,255,255,.12);display:grid;place-items:center;">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <nav class="mnav" aria-label="모바일 내비게이션">
      <details>
        <summary>소개&미션<span class="chev"></span></summary>
        <div class="gs2">
          <a href="./introduce.html">우리는</a>
          <a href="./history.html">활동 연혁</a>
          <a href="./team.html">함께하는 사람들</a>
          <a href="./location.html">오시는 길</a>
        </div>
      </details>

      <details>
        <summary>자연과 회복 <span class="chev"></span></summary>
        <div class="gs2">
          <a href="./nature.html">자연과 회복</a>
        </div>
      </details>

      <details>
        <summary>프로그램 소개<span class="chev"></span></summary>
        <div class="gs2">
          <a href="./kids-program.html">어린이 숲 프로그램</a>
          <a href="./expert-program.html">전문가 숲 프로그램</a>
        </div>
      </details>

      <details>
        <summary>진행 중인 프로그램 <span class="chev"></span></summary>
        <div class="gs2">
          <a href="./program.html">세부 프로그램</a>
          <a href="./nature.html">연간 프로그램</a>
          <a href="./nature.html">참여 및 문의</a>
        </div>
      </details>
    </nav>
  </aside>
</section>
`;

  // 2) 메뉴 동작 초기화 함수
  function initNbbioMenu(root) {
    if (!root) return;

    const barEl = root.querySelector('.bar');
    const header = barEl ? barEl.parentElement : null;
    const gnb = root.querySelector('.gnb');
    const megalite = root.querySelector('.megalite');

    const btnHamburger = root.querySelector('.menuBtn');
    const mega = root.querySelector('.mega');
    const closeMegaBtn = root.querySelector('.closeMega');

    const overlay = root.querySelector('.overlay');
    const drawer = root.querySelector('.drawer');
    const closeDrawer = root.querySelector('.closeDrawer');

    const logoImg = root.querySelector('.bar .logo img');

    if (!barEl || !header || !btnHamburger || !mega || !overlay || !drawer) return;

    const isDesktop = () => window.matchMedia('(min-width:1280px)').matches;
    const canHover = () => window.matchMedia('(hover:hover)').matches;
    const lockScroll = (on) => { document.documentElement.style.overflow = on ? 'hidden' : ''; };

    if (gnb) {
      gnb.addEventListener('mouseover', () => header.classList.add('act'));
      header.addEventListener('mouseleave', () => header.classList.remove('act'));
    }

    /* ========= PC: GNB hover → 라이트 패널 ========= */
    let liteTimer = null;
    const openLite = () => {
      if (!isDesktop() || !megalite) return;
      clearTimeout(liteTimer);
      megalite.classList.add('act');
    };
    const closeLite = () => { if (megalite) megalite.classList.remove('act'); };
    const delayedCloseLite = () => {
      if (!megalite) return;
      clearTimeout(liteTimer);
      liteTimer = setTimeout(closeLite, 120);
    };

    if (gnb && megalite) {
      gnb.addEventListener('mouseenter', openLite);
      gnb.addEventListener('focusin', openLite);
      gnb.addEventListener('mouseleave', delayedCloseLite);
      megalite.addEventListener('mouseenter', () => clearTimeout(liteTimer));
      megalite.addEventListener('mouseleave', delayedCloseLite);
    }

    root.querySelectorAll('.gnb > li').forEach(li => {
      li.addEventListener('mouseenter', () => { if (isDesktop()) li.classList.add('is-on'); });
      li.addEventListener('mouseleave', () => li.classList.remove('is-on'));
      li.addEventListener('focusin', () => { if (isDesktop()) li.classList.add('is-on'); });
      li.addEventListener('focusout', () => li.classList.remove('is-on'));
    });

    /* ========= PC: 햄버거 → 전체 메가메뉴 ========= */
    const openMega = () => {
      mega.classList.add('act');
      btnHamburger.setAttribute('aria-expanded', 'true');
      lockScroll(true);
      root.classList.add('scroll-up');
      root.classList.remove('scroll-down');
      syncLogo();
    };
    const closeMega = () => {
      mega.classList.remove('act');
      btnHamburger.setAttribute('aria-expanded', 'false');
      lockScroll(false);
      syncLogo();
    };

    /* ========= MOBILE: Drawer ========= */
    const openDrawer = () => {
      overlay.hidden = false;
      overlay.classList.add('act');
      drawer.classList.add('act');
      drawer.setAttribute('aria-hidden', 'false');
      lockScroll(true);
      initMobileMenus(true);
      root.classList.add('scroll-up');
      root.classList.remove('scroll-down');
      syncLogo();
    };
    const closeDrawerAll = () => {
      overlay.classList.remove('act');
      overlay.hidden = true;
      drawer.classList.remove('act');
      drawer.setAttribute('aria-hidden', 'true');
      lockScroll(false);
      syncLogo();
    };

    btnHamburger.addEventListener('click', () => {
      if (isDesktop()) {
        closeLite();
        openMega();
      } else {
        openDrawer();
      }
    });

    const closeAll = () => { closeMega(); closeDrawerAll(); };

    if (closeMegaBtn) closeMegaBtn.addEventListener('click', closeAll);

    const scrim = root.querySelector('[data-close="mega"]');
    if (scrim) scrim.addEventListener('click', closeAll);

    if (closeDrawer) closeDrawer.addEventListener('click', closeDrawerAll);
    overlay.addEventListener('click', closeDrawerAll);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });

    /* ========= 모바일 아코디언 ========= */
    const detailsList = Array.from(root.querySelectorAll('.mnav details'));
    const getPanel = (d) => d.querySelector('.gs2');

    const resetInline = (panel) => {
      if (!panel) return;
      if (panel._endHandler) {
        panel.removeEventListener('transitionend', panel._endHandler);
        panel._endHandler = null;
      }
    };

    const slideOpen = (panel) => {
      if (!panel) return;
      resetInline(panel);
      panel.style.transition = 'none';
      panel.style.maxHeight = '0px';
      void panel.offsetHeight;
      panel.style.transition = 'max-height .32s ease';
      panel.style.maxHeight = panel.scrollHeight + 'px';
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        panel.style.transition = 'none';
        panel.style.maxHeight = 'none';
        panel.removeEventListener('transitionend', onEnd);
        panel._endHandler = null;
      };
      panel._endHandler = onEnd;
      panel.addEventListener('transitionend', onEnd);
    };

    const slideClose = (panel, done) => {
      if (!panel) { if (done) done(); return; }
      resetInline(panel);
      const current = panel.scrollHeight;
      panel.style.transition = 'none';
      panel.style.maxHeight = current + 'px';
      void panel.offsetHeight;
      panel.style.transition = 'max-height .28s ease';
      panel.style.maxHeight = '0px';
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        panel.style.transition = 'none';
        panel.removeEventListener('transitionend', onEnd);
        panel._endHandler = null;
        if (done) done();
      };
      panel._endHandler = onEnd;
      panel.addEventListener('transitionend', onEnd);
    };

    const openOne = (target) => {
      detailsList.forEach(d => {
        const p = getPanel(d);
        if (d === target) {
          if (!d.hasAttribute('open')) {
            d.setAttribute('open', '');
            slideOpen(p);
          } else {
            slideClose(p, () => d.removeAttribute('open'));
          }
        } else if (d.hasAttribute('open')) {
          slideClose(p, () => d.removeAttribute('open'));
        }
      });
    };

    detailsList.forEach(d => {
      const sum = d.querySelector('summary');
      if (!sum) return;
      sum.addEventListener('click', (e) => {
        e.preventDefault();
        openOne(d);
      });
    });

    function initMobileMenus(resetHeights = false) {
      detailsList.forEach(d => {
        const p = getPanel(d);
        d.removeAttribute('open');
        if (resetHeights && p) {
          resetInline(p);
          p.style.transition = 'none';
          p.style.maxHeight = '0px';
        }
      });
    }
    initMobileMenus(true);

    const resetStates = () => {
      if (isDesktop()) {
        closeDrawerAll();
      } else {
        mega.classList.remove('act');
        if (megalite) megalite.classList.remove('act');
        btnHamburger.setAttribute('aria-expanded', 'false');
        lockScroll(false);
        initMobileMenus(true);
      }
      syncLogo();
    };
    window.addEventListener('resize', resetStates);

    /* ========= 스크롤/호버 상태에 따른 로고 스왑 ========= */
    let lastY = window.scrollY || 0;
    const delta = 6;
    let ticking = false;

    let mobilePeek = false;
    let mobilePeekTimer = null;

    function setHoveringClass(on) {
      root.classList.toggle('hovering', !!on);
    }

    function setMobilePeek(on, ms = 1200) {
      mobilePeek = !!on;
      clearTimeout(mobilePeekTimer);
      setHoveringClass(mobilePeek);
      if (mobilePeek) {
        mobilePeekTimer = setTimeout(() => {
          mobilePeek = false;
          setHoveringClass(false);
          syncLogo();
        }, ms);
      }
    }

    function isMenuHovered() {
      if (canHover()) {
        return (
          (barEl && barEl.matches(':hover')) ||
          (header && header.classList.contains('act')) ||
          (megalite && megalite.classList.contains('act') && megalite.matches(':hover')) ||
          (gnb && gnb.matches(':hover'))
        );
      }
      return mobilePeek;
    }

    function setLogo(src) {
      if (!logoImg) return;
      if (logoImg.getAttribute('src') !== src) logoImg.setAttribute('src', src);
    }

    function swapLogoByState(y) {
      const menuOpened = mega.classList.contains('act') || drawer.classList.contains('act');

      if (menuOpened || isMenuHovered()) setLogo('./img/logo-w.png');
      else if (y <= 30) setLogo('./img/logo-w.png');
      else setLogo('./img/logo-w.png');
    }

    function applyTopState(y) {
      if (y <= 30) root.classList.add('at-top');
      else root.classList.remove('at-top');
    }

    function handleScrollDirection() {
      const y = window.scrollY || 0;
      const diff = y - lastY;

      applyTopState(y);
      swapLogoByState(y);

      const forceShow = mega.classList.contains('act') || drawer.classList.contains('act');
      if (forceShow) {
        root.classList.add('scroll-up');
        root.classList.remove('scroll-down');
        lastY = y;
        ticking = false;
        return;
      }

      if (Math.abs(diff) > delta) {
        if (diff > 0) {
          root.classList.add('scroll-down');
          root.classList.remove('scroll-up');
        } else {
          root.classList.add('scroll-up');
          root.classList.remove('scroll-down');
        }
        lastY = y;
      }

      if (y <= 0) {
        root.classList.remove('scroll-down');
        root.classList.add('scroll-up');
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(handleScrollDirection);
        ticking = true;
      }
    }

    function syncLogo() {
      swapLogoByState(window.scrollY || 0);
    }

    function syncHoveringState() {
      if (!canHover()) return;
      const y = window.scrollY || 0;
      const hovering = (y <= 30) && (
        (barEl && barEl.matches(':hover')) ||
        (gnb && gnb.matches(':hover')) ||
        (megalite && megalite.classList.contains('act') && megalite.matches(':hover'))
      );
      setHoveringClass(hovering);
      syncLogo();
    }

    function peekIfTop() {
      if (canHover()) return;
      const y = window.scrollY || 0;
      if (y > 30) return;
      setMobilePeek(true, 1200);
      syncLogo();
    }

    if (barEl) {
      ['mouseenter','mouseleave','mousemove'].forEach(evt => barEl.addEventListener(evt, syncHoveringState));
    }
    if (gnb) {
      ['mouseenter','mouseleave','mousemove'].forEach(evt => gnb.addEventListener(evt, syncHoveringState));
    }
    if (megalite) {
      ['mouseenter','mouseleave','mousemove'].forEach(evt => megalite.addEventListener(evt, syncHoveringState));
    }

    barEl.addEventListener('pointerdown', peekIfTop, { passive: true });
    const globeBtnTop = root.querySelector('.bar .globeBtn');
    if (globeBtnTop) globeBtnTop.addEventListener('pointerdown', peekIfTop, { passive: true });
    btnHamburger.addEventListener('pointerdown', peekIfTop, { passive: true });

    window.addEventListener('scroll', () => {
      if (!canHover() && mobilePeek) {
        setMobilePeek(false);
        syncLogo();
      }
    }, { passive: true });

    document.addEventListener('pointerdown', (e) => {
      if (canHover()) return;
      if (!mobilePeek) return;
      if (barEl && barEl.contains(e.target)) return;
      setMobilePeek(false);
      syncLogo();
    }, { passive: true });

    if (barEl) ['mouseenter','mouseleave'].forEach(evt => barEl.addEventListener(evt, syncLogo));
    if (gnb) ['mouseenter','mouseleave'].forEach(evt => gnb.addEventListener(evt, syncLogo));
    if (megalite) ['mouseenter','mouseleave'].forEach(evt => megalite.addEventListener(evt, syncLogo));
    if (header) ['mouseenter','mouseleave'].forEach(evt => header.addEventListener(evt, syncLogo));

    applyTopState(window.scrollY || 0);
    root.classList.add('scroll-up');
    setHoveringClass(false);
    syncLogo();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 3) mount 함수: #menu_a에 템플릿 주입 후 init
  function mountMenu() {
    const mount = document.getElementById('menu_a');
    if (!mount) return;
    if (mount._nbbioMounted) return;
    mount._nbbioMounted = true;

    mount.innerHTML = HEADER_TEMPLATE;

    const root = mount.querySelector('#nbbioHeaderLocal');
    initNbbioMenu(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountMenu);
  } else {
    mountMenu();
  }
})();