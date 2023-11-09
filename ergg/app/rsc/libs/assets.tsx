import { Data } from "./refactor";

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

export function updateEndDisable(startTierGroup:number) {
  endOptions.map((options, p) => {
    if (options.value > startTierGroup) {
      endOptions[p].isDisabled = true;
    } else {
      endOptions[p].isDisabled = false;
    }
  });
}

export function updateStartDisable(endTierGroup:number) {
  startOptions.map((options, p) => {
    if (options.value < endTierGroup) {
      startOptions[p].isDisabled = true;
    } else {
      startOptions[p].isDisabled = false;
    }
  });
}

export function getColor(tier: number) {
  switch (tier) {
    case 0: return `bg-zinc-700 border-zinc-700`
    case 1: return `bg-sky-500 border-sky-500`
    case 2: return `bg-emerald-500 border-emerald-500`
    case 3: return `bg-amber-500 border-amber-500`
    case 4: return `bg-orange-500 border-orange-500`
    case 5: return `bg-rose-500 border-rose-500`
    case 6: return `bg-red-900 border-red-900`
    default: return `bg-stone-100 border-stone-100`
  }
}

export const scrollbarStyles = {
  menuList: (base: any) => ({
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

interface Standard {
  wr : (x: Data, y: Data) => number,
  pr : (x: Data, y: Data) => number,
  sr : (x: Data, y: Data) => number,
  np : (x: Data, y: Data) => number,
  ag : (x: Data, y: Data) => number,
  current? : (x: Data, y: Data) => number,
}

export const sortStandard:Standard = {
  wr : (x: Data, y: Data) => {
    if (x.WR !== y.WR) return y.WR - x.WR;
    if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
    return y.code - x.code;
  },
  pr : (x: Data, y: Data) => {
    if (x.PR !== y.PR) return y.PR - x.PR;
    if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
    return y.code - x.code;
  },
  sr : (x: Data, y: Data) => {
    if (x.SR !== y.SR) return y.SR - x.SR;
    if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
    return y.code - x.code;
  },
  np : (x: Data, y: Data) => {
    if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
    if (x.PR !== y.PR) return y.PR - x.PR;
    return y.code - x.code;
  },
  ag : (x: Data, y: Data) => {
    if (x.data!.avggrade !== y.data!.avggrade) return y.data!.avggrade - x.data!.avggrade;
    if (x.PR !== y.PR) return y.PR - x.PR;
    return y.code - x.code;
  }
}