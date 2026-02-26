# 06. Motion System

## Motion Types
1. Hero Slow Parallax
- shift max: 36px
- 적용 대상: 배경 레이어만

2. Section Reveal
- opacity 0 -> 1
- y 20 -> 0
- duration: 620ms

3. Stagger Cards
- delay: 70~90ms
- 대상: reason/history/archive cards

## Accessibility
- `prefers-reduced-motion: reduce`에서 모션 제거
- 모션 실패 시 기본 콘텐츠는 항상 visible
