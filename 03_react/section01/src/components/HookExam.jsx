import useInput from "../hooks/useInput"

// 1. 함수 컴포넌트, 커스텀 혹 내부에서만 호출 가능.
// 2. 조건부로 호출될 수 없다. 
// 3. 나만의 훅 직접 만들 수 있다. 


const HookExam = () => {

  const [input, onChange] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
    </div>
  )
}

export default HookExam;