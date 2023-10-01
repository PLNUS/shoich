export default function TrendGrid() {
    return (
        <div className="main_grid_block">
            <h1 className="main_grid_block_title">가장 핫한 실험체는?</h1>
            <div className="main_grid_block_item">
                <div className="tiericon">
                    <div className="charicon_dir border-[6px] border-sky-400 scale-[97%]">
                        <img className="charicon" src={`/characters/16.webp`} />
                    </div>
                    <span className="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-sky-400">1</span>
                </div>
                <div className="flex flex-col grow pl-4 pt-1">
                    <div className="font-mb text-md text-xl">
                        투척 아드리아나
                    </div>
                    <div className="font-ml text-sm tracking-tight">
                        100,000 표본간 픽률 5%p 상승!
                    </div>
                    <div className="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                        <div className="tiericon">
                            <div className="charicon_dir border-[4px] border-emerald-400">
                                <img className="charicon" src={`/characters/31.webp`} />
                            </div>
                            <span className="charicon_tier bg-emerald-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                        </div>
                        <div className="tiericon">
                            <div className="charicon_dir border-[4px] border-amber-400">
                                <img className="charicon" src={`/characters/33.webp`} />
                            </div>
                            <span className="charicon_tier bg-amber-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                        </div>
                        <div className="tiericon">
                            <div className="charicon_dir border-[4px] border-rose-400">
                                <img className="charicon" src={`/characters/37.webp`} />
                            </div>
                            <span className="charicon_tier bg-rose-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}