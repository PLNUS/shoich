import { motion } from "framer-motion"
import { Data } from "../datas/refactor";

export const startOptions = [
  {
    text: '브론즈',
    value: 8,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/브론즈.png" className="h-[25px] object-cover" />브론즈</div>,
  },
  {
    text: '실버',
    value: 7,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/실버.png" className="h-[25px] object-cover" />실버</div>,
  },
  {
    text: '골드',
    value: 6,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/골드.png" className="h-[25px] object-cover" />골드</div>,
  },
  {
    text: '플래티넘',
    value: 5,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/플래티넘.png" className="h-[25px] object-cover" />플래티넘</div>,
  },
  {
    text: '다이아몬드',
    value: 4,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/다이아몬드.png" className="h-[25px] object-cover" />다이아몬드</div>,
  },
  {
    text: '미스릴',
    value: 3,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/미스릴.png" className="h-[25px] object-cover" />미스릴</div>,
  },
  {
    text: '데미갓',
    value: 2,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/데미갓.png" className="h-[25px] object-cover" />데미갓</div>,
  },
  {
    text: '이터니티',
    value: 1,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/이터니티.png" className="h-[25px] object-cover" />이터니티</div>,
  },
];
export const endOptions = [
  {
    text: '브론즈',
    value: 8,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/브론즈.png" className="h-[25px] object-cover" />브론즈</div>,
  },
  {
    text: '실버',
    value: 7,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/실버.png" className="h-[25px] object-cover" />실버</div>,
  },
  {
    text: '골드',
    value: 6,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/골드.png" className="h-[25px] object-cover" />골드</div>,
  },
  {
    text: '플래티넘',
    value: 5,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/플래티넘.png" className="h-[25px] object-cover" />플래티넘</div>,
  },
  {
    text: '다이아몬드',
    value: 4,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/다이아몬드.png" className="h-[25px] object-cover" />다이아몬드</div>,
  },
  {
    text: '미스릴',
    value: 3,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/미스릴.png" className="h-[25px] object-cover" />미스릴</div>,
  },
  {
    text: '데미갓',
    value: 2,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/데미갓.png" className="h-[25px] object-cover" />데미갓</div>,
  },
  {
    text: '이터니티',
    value: 1,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/이터니티.png" className="h-[25px] object-cover" />이터니티</div>,
  },
];

export function getColor(tier: number) {
  switch (tier) {
    case 0: return `bg-stone-500`
    case 1: return `bg-sky-500`
    case 2: return `bg-emerald-500`
    case 3: return `bg-amber-500`
    case 4: return `bg-orange-500`
    case 5: return `bg-rose-500`
    default: return `bg-stone-100`
  }
}

export function TierSelector(props) {
  return;
}

export const scrollbarStyles = {
  menuList: (base) => ({
    ...base,
    height: "auto",

    "::-webkit-scrollbar": {
      width: "5px"
    },
    "::-webkit-scrollbar-track": {
      background: "rgba(255,255,255,0)",
    },
    "::-webkit-scrollbar-thumb": {
      "border-radius": "20px",
      background: "#AAA"
    },
    "::-webkit-scrollbar-thumb:hover": {
      "border-radius": "20px",
      background: "#777"
    }
  })
};