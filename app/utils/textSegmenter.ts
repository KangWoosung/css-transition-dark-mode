/**
 * 텍스트를 그래핀 클러스터 단위로 분할하는 유틸리티 함수
 * 이모지, 한글, 복합 문자 등을 올바르게 처리합니다.
 *
 * @param text - 분할할 텍스트
 * @param locale - 로케일 (기본값: "en")
 * @returns 분할된 문자 배열
 */
export function segmentText(text: string, locale: string = "en"): string[] {
  if (!text) return [];

  const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(text));

  return segments.map((segment) => segment.segment);
}

/**
 * HTML 요소의 텍스트를 각 문자를 span으로 감싸도록 변환합니다.
 * 이모지, 한글, 복합 문자 등을 올바르게 처리합니다.
 *
 * @param element - 변환할 HTML 요소
 * @param locale - 로케일 (기본값: "en")
 * @param preserveWhitespace - 공백을 non-breaking space로 변환할지 여부 (기본값: true)
 */
export function wrapTextInSpans(
  element: HTMLElement,
  locale: string = "en",
  preserveWhitespace: boolean = true
): void {
  const text = element.textContent || "";
  const segments = segmentText(text, locale);

  // aria-label
  element.ariaLabel = text;

  // 기존 내용을 지우고 각 문자를 span으로 감싸기
  element.innerHTML = "";
  segments.forEach((segment) => {
    const span = document.createElement("span");
    // 공백을 non-breaking space로 처리
    span.textContent =
      preserveWhitespace && segment === " " ? "\u00A0" : segment;
    element.appendChild(span);
  });
}
