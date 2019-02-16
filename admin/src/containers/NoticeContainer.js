import React, { Component } from 'react';
import { Divider } from 'antd';

class NoticeContainer extends Component {
    render() {
        return (
            <div>
                <h2>안내</h2>
                <p>
                    네이버 중국어사전 구글 크롬 확장 프로그램은 네이버에서 제작한 프로그램이 아니라 개인이 비상업적 용도로 제작한 프로그램입니다.<br />
                    따라서, 해당 앱에 대한 유지 보수가 느리거나 어려울 수 있습니다.<br />
                    기능 추가 요청은 pelogvc@gmail.com으로 해주시면 됩니다.
                </p>
                <Divider />
                <h2>버전기록</h2>
                <p>
                    <h4>0.9.0</h4>
                    <ul>
                        <li>단어장 기능 추가</li>
                        <li>안내 화면 추가</li>
                    </ul>
                </p>
                <p>
                    <h4>0.0.5</h4>
                    <ul>
                        <li>에러 수정</li>
                    </ul>
                </p>
                <p>
                    <h4>0.0.4</h4>
                    <ul>
                        <li>비슷한 단어, 상반된 단어 기능 추가</li>
                        <li>예문 추가</li>
                    </ul>
                </p>
                <p>
                    <h4>0.0.1</h4>
                    <ul>
                        <li>확장앱 출시</li>
                    </ul>
                </p>
            </div>
        );
    }
}

export default NoticeContainer;