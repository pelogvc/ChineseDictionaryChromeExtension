import React from 'react';
import './Recently.scss';
import { Divider, Skeleton, Table, Icon, Tooltip } from 'antd';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ko';


const Recently = ( { changeCurrentPage, loading, list, pageCount, currentPage, data }) => {

    const columns = [{
        title: '단어',
        key: 'word',
        render: (data) => (
            <span>{ data.query }{ data.pinyin && `[${data.pinyin}]` }</span>
        )
    }, {
        title: '뜻',
        key: 'mean',
        render: (data) => {
            return data.meanList.map((obj, i) => (
                <div className="meanList" key={i}>
                    <span className="index">{i+1}.</span>
                    <span className="partsLabel">{obj.partsLabel}</span>
                    <span className="mean">{obj.mean.replace(/(<([^>]+)>)/ig,"")}</span>
                </div>
            ));
        }
    }, {
        title: '날짜',
        key: 'date',
        width: 100,
        render: (data) => (
            <Tooltip 
                title={ moment(data.created).format('LLLL') }
            >
                { moment(data.created).fromNow() }
            </Tooltip>
        )
    }, {
        title: '',
        key: 'action',
        width: 20,
        render: (data) => (
            <a href={data.searchUrl} target="_blank" rel="noopener noreferrer">
                <Tooltip 
                    title="네이버 사전으로 검색하기">
                    <Icon type="search" />
                </Tooltip>
            </a>
        )
    }];

    return (
        <div>
            <h2>단어장</h2>
            <div className="Recently-main">
            { loading && <Skeleton /> }
            { loading || <Table dataSource={data} columns={columns} /> }
            </div>
            <Divider />
            <div>
                <p>
                    단어장은 서버에 저장하지 않으므로 크롬을 재설치하시면 초기화 될 수 있습니다.
                </p>
            </div>
        </div>
    );
};

export default Recently;