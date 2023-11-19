import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    open: boolean;
}

const Modal = ({ open }: ModalProps) => {
    if (!open) return null;
    return ReactDOM.createPortal(
        <div className="flex justify-center items-center fixed w-screen h-screen -translate-x-[50%] bg-opacity-70 bg-zinc-800 animate-fade">
            <div className="flex flex-col items-center justify-center rounded shadow-xl bg-white p-4 gap-y-3">
                <div className="flex flex-row gap-x-4 ">
                    <LoadingSVG />
                    <div className="font-rb text-2xl tracking-wider">
                        통계 데이터 로딩중..
                    </div>
                </div>
                <div className="font-mr text-sm tracking-tight text-center">
                    로딩이 10초 이상 지속되면 새로고침 해 주세요.
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

function LoadingSVG() {
    return (
        <svg width="30" height="30" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                    <stop stop-color="#000" stop-opacity="0" offset="0%" />
                    <stop stop-color="#000" stop-opacity=".631" offset="63.146%" />
                    <stop stop-color="#000" offset="100%" />
                </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite" />
                    </path>
                    <circle fill="#000" cx="36" cy="18" r="1">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </g>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"

                            from="0 18 18"
                            to="360 18 18"
                            dur="1.5s"
                            repeatCount="indefinite" />
                    </path>
                    <circle fill="#444" cx="36" cy="18" r="1">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1.5s"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </g>

        </svg>
    )
}

export default Modal;