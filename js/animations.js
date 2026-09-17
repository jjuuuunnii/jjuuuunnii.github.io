// 읽는 흐름을 방해하지 않도록 화면 진입 효과를 첫 화면에만 적용한다.
// 스크롤로 이동하는 본문과 이미지에는 숨김·대기 애니메이션을 적용하지 않는다.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelector(".hero-main")?.animate(
    [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 550, easing: "cubic-bezier(.2,.7,.2,1)" }
  );
}
