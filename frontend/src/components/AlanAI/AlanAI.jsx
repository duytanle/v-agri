import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAlan, updateCheckVoice } from "../../store/alanai/alan-slice";

const AlanAI = () => {
    const alanBtnRef = useRef({}).current;
    const { command, checkVoice } = useSelector((state) => state.alan);
    const dispatch = useDispatch();
    const handleRecognition = (e) => {
        let SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();
        recognition.lang = "vi-VI";
        recognition.continuos = false;
        recognition.onresult = (e) => {
            console.log(
                e.results[0][0].transcript
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/đ/g, "d")
                    .replace(/Đ/g, "D")
                    .replaceAll(".", "")
            );
            alanBtnRef.btnInstance.sendText(
                e.results[0][0].transcript
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/đ/g, "d")
                    .replace(/Đ/g, "D")
                    .replaceAll(".", "")
                    .replaceAll(",", "_")
            );
        };
        recognition.start();
    };
    const handleCommand = (command) => {
        dispatch(updateAlan(command));
        dispatch(updateCheckVoice());
    };
    useEffect(() => {
        alanBtnRef.btnInstance = alanBtn({
            key: "138b9a2bc47cc344cec92e692bf538502e956eca572e1d8b807a3e2338fdd0dc/stage",
            onCommand: function ({ command }) {
                console.log(command);
                handleCommand(command);
            },
        });
    }, []);
    return (
        <div
            className="absolute z-[1000] bottom-2 right-10 w-[50px] h-[50px] rounded-full p-1 bg-primary-color text-white flex justify-center items-center hover:bg-hover-priColor cursor-pointer"
            onClick={handleRecognition}
        >
            <i className="fa-solid fa-microphone text-2xl"></i>
        </div>
    );
};
// alanBtnRef.btnInstance.sendText("khỏe ha");
// alanBtnRef.btnInstance.onCommand;

export default AlanAI;
