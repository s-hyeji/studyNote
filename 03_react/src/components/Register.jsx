import { useState } from "react";

// 회원가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    contry: "",
    bio: "",
  })

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <div>
        <input name="name" value={input.name} onChange={onChange} type="text" placeholder="이름" />
      </div>
      <div>
        <input name="birth" value={input.birth} onChange={onChange} type="date" />
        {input.birth}
      </div>
      <div>
        <select name="contry" value={input.contry} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {input.contry}
      </div>

      <div>
        <textarea name="bio" value={input.bio} onChange={onChange}></textarea>
        {input.bio}
      </div>
    </div>
  );
};

export default Register;