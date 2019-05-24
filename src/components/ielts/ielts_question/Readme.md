IeltsQuestion component example:

```js
<IeltsQuestion
    setStepRecord={() => {}}
    step={{
        index: 5,
        questionCount: 8,
        questionId: 1007162,
        questionIndex: 5,
        subject: "Base",
        type: "ChooseMany",
        question: {
            "id": 1007164,
            "name": "测试-基础题库 Q3",
            "status": "Visible",
            "type": "Blank",
            "questionTagId": null,
            "rank": 3,
            "difficulty": "Hard",
            "exampleNum": 0,
            "stem": {
                "paragraphs": [
                    {
                        "id": "f324ced6-7f7c-162d-e188-7c7ef2ae9803",
                        "text": "撒好的艰苦",
                        "type": "Text"
                    }
                ],
                "inlineMarkup": [
                    {
                        "pid": "f324ced6-7f7c-162d-e188-7c7ef2ae9803",
                        "type": "InsertLine",
                        "index": 2,
                        "value": "middle",
                        "length": 1
                    },
                    {
                        "pid": "f324ced6-7f7c-162d-e188-7c7ef2ae9803",
                        "type": "InsertLine",
                        "index": 4,
                        "value": "small",
                        "length": 1
                    }
                ]
            },
            "extra": null,
            "practiceId": 1002107,
            "examId": 65,
            "videoTimeRangeId": null,
            "subjectId": 293,
            "conciseId": null,
            "audition": null,
            "textbookId": 148,
            "recommendDuration": 120,
            "practiceTypeId": null,
            "createdAt": "2019-02-28T03:48:06.000Z",
            "updatedAt": "2019-02-28T03:48:06.000Z",
            "materials": [
                {
                    "id": 28236,
                    "qNum": null,
                    "rank": 1,
                    "subStem": null,
                    "image": null,
                    "audio": null,
                    "audioReference": null,
                    "reference": null,
                    "direction": {
                        "paragraphs": [
                            {
                                "id": "2484f462-a236-857e-316c-1a0b4167ed0a",
                                "text": "睡吧快到你家了吗；1",
                                "type": "Text"
                            }
                        ]
                    },
                    "videoTimeRangeId": null,
                    "choices": null,
                    "insertSentence": null,
                    "positionTip": null,
                    "answer": [
                        "1|1",
                        "1|1"
                    ],
                    "analysis": {
                        "paragraphs": [
                            {
                                "id": "f3a0508c-baa3-c200-988e-c3dc728d60cf",
                                "text": "撒到你们",
                                "type": "Text"
                            }
                        ]
                    },
                    "examples": null,
                    "questionId": 1007164,
                    "origin": {
                        "paragraphs": [
                            {
                                "id": "677667fb-464f-4b71-7306-5e8319a96e88",
                                "text": "阿斯顿会比较困难了",
                                "type": "Text"
                            }
                        ]
                    },
                    "score": null,
                    "labels": null
                }
            ]
        },
    }}
    stepRecord={{}}
    question={{
        "id": 1007164,
        "name": "测试-基础题库 Q3",
        "status": "Visible",
        "type": "Blank",
        "questionTagId": null,
        "rank": 3,
        "difficulty": "Hard",
        "exampleNum": 0,
        "stem": {
            "paragraphs": [
                {
                    "id": "f324ced6-7f7c-162d-e188-7c7ef2ae9803",
                    "text": "撒好的艰苦",
                    "type": "Text"
                }
            ],
            "inlineMarkup": [
                {
                    "pid": "f324ced6-7f7c-162d-e188-7c7ef2ae9803",
                    "type": "InsertLine",
                    "index": 2,
                    "value": "middle",
                    "length": 1
                },
                {
                    "pid": "f324ced6-7f7c-162d-e188-7c7ef2ae9803",
                    "type": "InsertLine",
                    "index": 4,
                    "value": "small",
                    "length": 1
                }
            ]
        },
        "extra": null,
        "practiceId": 1002107,
        "examId": 65,
        "videoTimeRangeId": null,
        "subjectId": 293,
        "conciseId": null,
        "audition": null,
        "textbookId": 148,
        "recommendDuration": 120,
        "practiceTypeId": null,
        "createdAt": "2019-02-28T03:48:06.000Z",
        "updatedAt": "2019-02-28T03:48:06.000Z",
        "materials": [
            {
                "id": 28236,
                "qNum": null,
                "rank": 1,
                "subStem": null,
                "image": null,
                "audio": null,
                "audioReference": null,
                "reference": null,
                "direction": {
                    "paragraphs": [
                        {
                            "id": "2484f462-a236-857e-316c-1a0b4167ed0a",
                            "text": "睡吧快到你家了吗；1",
                            "type": "Text"
                        }
                    ]
                },
                "videoTimeRangeId": null,
                "choices": null,
                "insertSentence": null,
                "positionTip": null,
                "answer": [
                    "1|1",
                    "1|1"
                ],
                "analysis": {
                    "paragraphs": [
                        {
                            "id": "f3a0508c-baa3-c200-988e-c3dc728d60cf",
                            "text": "撒到你们",
                            "type": "Text"
                        }
                    ]
                },
                "examples": null,
                "questionId": 1007164,
                "origin": {
                    "paragraphs": [
                        {
                            "id": "677667fb-464f-4b71-7306-5e8319a96e88",
                            "text": "阿斯顿会比较困难了",
                            "type": "Text"
                        }
                    ]
                },
                "score": null,
                "labels": null
            }
        ]
    }}
    isReport={false}
    >jsjjs</IeltsQuestion>
```