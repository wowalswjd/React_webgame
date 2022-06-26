import React, { Component } from 'react';
import Try from './Try';

function getNumbers(){ //숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i=0; i<4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            //맞췄는가? 홈런이 떠야 함
            this.setState({
                result:'홈런!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}]
            })
            alert('게임 다시 시작');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else{ //답 틀림
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                //10번 틀림
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`,
                })
                alert('게임 다시 시작');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else{ 
                for(let i=0; i<4; i+=1){
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if(this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState({ //기회 더 주기
                    tries: [...this.state.tries, {try: this.state.value, result: `${strike}스트라이크, ${ball}볼입니다.`}],
                    value:'',
                })
            }
        }

    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render(){
        //const {result, value, tries} = this.state; //구조 분해 실제로도 이렇게 많이 쓴다고~
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} /> 
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i+1}차 시도: `} tryInfo={v} index={i} />
                        );
                    })}
                </ul>
            </>
        )
    } //value와 onChange는 세트라고 한다. 
    //map이란 react에서 반복문을 쓰는 방법
    //두 개의 요소면 보통 객체를 쓰는 듯
}

//export const hello = 'hello';를 가져올 때는 import { hello }
export default NumberBaseball; //default로 export한 것들을 가져올 때는 import NumberBaseball