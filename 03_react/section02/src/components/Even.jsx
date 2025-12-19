import { useEffect } from "react";

const Even = () => {

  useEffect(() => {

    return () => {
      console.log("unMount");

    };
  }, [])

  return <div>짝수 입니다. ㅋ</div>

}


export default Even