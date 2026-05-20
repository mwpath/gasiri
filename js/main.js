// ./js/main.js
(function () {
  'use strict';

  function initHeaderJS() {
    const nav = document.getElementById('nwNav');
    const hamburger = document.getElementById('nwHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const dots = document.getElementById('nwDots');
    const overlay = document.getElementById('nwSitemap');
    const closeBtn = document.getElementById('nwSitemapClose');

    if (!nav || !hamburger || !mobileMenu || !overlay) return;

    /* 스크롤 방향에 따라 Nav 숨김/표시 */
    let lastScrollY = window.scrollY, ticking = false;
    function onScrollDir() {
      const cur = window.scrollY;
      if (cur > lastScrollY && cur > 80) nav.classList.add('hide');
      else nav.classList.remove('hide');
      lastScrollY = cur; ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScrollDir); ticking = true; }
    }, { passive: true });

    /* 스크롤 락 */
    function lockScroll(on) {
      document.documentElement.style.overflow = on ? 'hidden' : '';
      document.body.style.overflow = on ? 'hidden' : '';
    }

    /* ===== 사이트맵(도트) ===== */
    function openOverlay(){
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden','false');
      document.body.classList.add('is-sitemap-open');
      lockScroll(true);
      closeBtn && closeBtn.focus();
    }
    function closeOverlay(){
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden','true');
      document.body.classList.remove('is-sitemap-open');
      lockScroll(false);
      dots && dots.focus();
    }
    if(dots){
      dots.addEventListener('click', openOverlay);
      dots.addEventListener('keydown', (e)=>{
        if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openOverlay(); }
      });
    }
    closeBtn && closeBtn.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeOverlay(); });
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Escape' && overlay.classList.contains('is-open')) closeOverlay();
    });

    /* ===== 모바일 메뉴 ===== */
    function setMobileMenu(open){
      const isActive = mobileMenu.classList.contains('active');
      if(open === isActive) return;
      mobileMenu.classList.toggle('active', open);
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      lockScroll(open);
      if(open){
        const firstLink = mobileMenu.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
        firstLink && firstLink.focus({preventScroll:true});
      } else {
        if(window.matchMedia('(max-width: 960px)').matches) hamburger.focus({preventScroll:true});
      }
    }
    function toggleMobileMenu(){ setMobileMenu(!mobileMenu.classList.contains('active')); }

    if(hamburger){
      hamburger.addEventListener('click', (e) => {
        if(window.matchMedia('(max-width: 960px)').matches) {
          e.preventDefault(); e.stopImmediatePropagation(); toggleMobileMenu();
        }
      });
      hamburger.addEventListener('keydown', (e) => {
        if(window.matchMedia('(max-width: 960px)').matches) {
          if(e.key==='Enter' || e.key===' ') { e.preventDefault(); e.stopImmediatePropagation(); toggleMobileMenu(); }
        }
      });
    }

    // 모바일 메뉴 바깥 클릭 닫기
    mobileMenu.addEventListener('click', (e)=>{
      const panel = mobileMenu.querySelector('ul');
      const inside = panel && panel.contains(e.target);
      if(!inside){ setMobileMenu(false); }
    });

    // ESC 닫기
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Escape' && mobileMenu.classList.contains('active')) setMobileMenu(false);
    });

    // 문서 아무 곳 클릭해도 패널 밖이면 닫기 (데스크탑 보완)
    document.addEventListener('click', (e) => {
      if(mobileMenu.classList.contains('active') && !hamburger.contains(e.target)) {
        const panel = mobileMenu.querySelector('ul');
        if(panel && !panel.contains(e.target)){ setMobileMenu(false); }
      }
    });

    /* ===== 모바일 패널 상/하단 UI 주입 ===== */
    (function enhanceMobilePanel(){
      const list = mobileMenu.querySelector('ul');
      if(!list || list.dataset.mmEnhanced === '1') return;
      list.dataset.mmEnhanced = '1';

      // 상단 헤더
      const liHead = document.createElement('li');
      liHead.className = 'mm-head';
      const logoWrap = document.querySelector('#nwHeader .logo');
      const logoSVG = logoWrap ? logoWrap.innerHTML : '';
      liHead.innerHTML = `
        <a href="#" class="mm-brand" aria-label="홈으로">
          ${logoSVG}
        </a>
        <button type="button" class="mm-close" aria-label="메뉴 닫기" title="닫기">&times;</button>
      `;
      list.insertBefore(liHead, list.firstChild);

      // 본문 항목 클래스
      Array.from(list.children).forEach((li, idx) => { if(idx>0) li.classList.add('mm-list'); });

      // 하단 구역
      const liSep = document.createElement('li');
      liSep.innerHTML = `<div class="mm-sep" role="separator" aria-hidden="true"></div>`;
      list.appendChild(liSep);

      const liLang = document.createElement('li');
      liLang.className = 'mm-lang';
      liLang.innerHTML = `<span>KOR</span><i>|</i><a href="#" role="button" aria-label="영문 사이트">ENG</a>`;
      list.appendChild(liLang);

      const liCopy = document.createElement('li');
      liCopy.className = 'mm-copy';
      liCopy.innerHTML = `<div>Copyright © YUHANCARE Corporation.</div><div>All Rights Reserved.</div>`;
      list.appendChild(liCopy);

      // 닫기/브랜드 클릭
      const closeBtn2 = liHead.querySelector('.mm-close');
      if(closeBtn2 && hamburger){
        closeBtn2.addEventListener('click', () => {
          if(hamburger.getAttribute('aria-expanded') === 'true') hamburger.click();
        });
      }
      const brand = liHead.querySelector('.mm-brand');
      if(brand && hamburger){
        brand.addEventListener('click', (e)=>{
          e.preventDefault();
          if(hamburger.getAttribute('aria-expanded') === 'true') hamburger.click();
          window.scrollTo({top:0, behavior:'smooth'});
        });
      }
      // 항목 클릭 시 자동 닫힘
      list.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', ()=>{
          if(hamburger && hamburger.getAttribute('aria-expanded') === 'true') hamburger.click();
        });
      });
    })();
  }

  function initSolidHeader() {
    const header = document.getElementById('nwHeader');
    if (!header) return;
    const thresholdRatio = 0.09;
    function applySolid(){
      const should = window.scrollY > window.innerHeight * thresholdRatio;
      if(should) header.classList.add('is-solid');
      else header.classList.remove('is-solid');
    }
    applySolid();
    window.addEventListener('scroll', applySolid, { passive:true });
    window.addEventListener('resize', applySolid);
  }

  // 메뉴가 DOM에 주입되면 초기화
  document.addEventListener('menu:mounted', function(){
    initHeaderJS();
    initSolidHeader();
  });

  // 혹시 menu.js보다 main.js가 먼저 로드된 경우를 대비
  if (document.getElementById('nwHeader')) {
    initHeaderJS();
    initSolidHeader();
  }
})();


document.addEventListener("DOMContentLoaded", () => {
  // footer 로드
  const footerContainer = document.getElementById("footerContainer");
  if (footerContainer) {
    const script = document.createElement("script");
    script.src = "./js/footer.js";
    script.onload = () => {
      const year = document.getElementById("nwFooterYear");
      if (year) year.textContent = new Date().getFullYear();
    };
    footerContainer.appendChild(script);
  }
});

function initMobileMenuTwoDepth() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;

  const parents = mobileMenu.querySelectorAll('.mm-parent');
  if (!parents.length) return;

  parents.forEach((parent) => {
    const toggle = parent.querySelector('.mm-toggle');
    const sub    = parent.querySelector('.mm-sub');
    const link   = parent.querySelector('.mm-row > a');

    if (!toggle || !sub) return;

    // 기본 상태
    toggle.setAttribute('aria-expanded', 'false');

    const handleToggle = (e) => {
      if (e) e.stopPropagation();
      const isOpen = parent.classList.contains('is-open');

      // 하나만 펼치고 나머지는 접기
      parents.forEach((p) => {
        if (p !== parent) {
          p.classList.remove('is-open');
          const t = p.querySelector('.mm-toggle');
          const s = p.querySelector('.mm-sub');
          if (t) t.setAttribute('aria-expanded', 'false');
          if (s) s.style.maxHeight = '';
        }
      });

      if (isOpen) {
        // 닫기
        parent.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        sub.style.maxHeight = '';
      } else {
        // 열기
        parent.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        sub.style.maxHeight = sub.scrollHeight + 'px';
      }
    };

    // + 버튼 클릭 시 토글
    toggle.addEventListener('click', handleToggle);

    // 상단 텍스트(a)를 눌러도 서브메뉴 열리도록
    if (link) {
      link.addEventListener('click', (e) => {
        // 1) 아직 안 열려 있으면: 이동 막고, 서브메뉴만 열기
        if (!parent.classList.contains('is-open')) {
          e.preventDefault();
          handleToggle(e);
        }
        // 2) 이미 열려 있으면:
        //    - href가 없으면(첫 메뉴처럼) 그냥 토글만
        //    - href가 있으면 기본 동작(페이지 이동) 허용
        else {
          if (!link.getAttribute('href')) {
            e.preventDefault();
            handleToggle(e);
          }
          // href 있으면 그냥 두면 됨(두 번째 탭에 페이지 이동)
        }
      });
    }
  });
}

// DOM 로드 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenuTwoDepth);
} else {
  initMobileMenuTwoDepth();
}

