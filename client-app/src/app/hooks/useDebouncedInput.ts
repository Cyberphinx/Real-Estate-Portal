import { useState } from "react"

export const useDebouncedInput = (defaultText: string, debounceTime: number) => {
    const [text, setText] = useState<string | null>(defaultText);
    const [time, setTime] = useState<number | null>(null);

    const onChange = (text: string | null) => {
        if (time) clearTimeout(time);
        setTime(window.setTimeout(() => setText(text), debounceTime));
    }

    return [text, onChange];
}