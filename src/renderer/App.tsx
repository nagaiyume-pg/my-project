import { useState } from "react";
import "./App.css";

export const App = () => {
    const [textContent, setTextContent] = useState("");  // textContentを状態として管理

    const handleClick = async () => {
        // window.myAPI.openDialog() を呼び出し、結果を取得して textContent を更新
        const result = await window.myAPI.openDialog();
        setTextContent(result);  // 状態を更新
    };

    return (
        <div className="container">
            <h1>Hello.</h1>
            <button id="button" onClick={handleClick}>Open</button>
            <p id="text">{textContent}</p>  {/* 状態に基づいてテキストを表示 */}
        </div>
    );
};
