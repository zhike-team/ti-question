IeltsListeningQuestion component example:

```js
const IeltsListeningData = {
  step: {
    index: 2,
    practice: {
        "id": 1001266,
        "name": "剑7听力T4S2",
        "shortName": null,
        "status": "Visible",
        "examId": 2,
        "subjectId": 5,
        "conciseId": 8463,
        "textbookId": 3,
        "topicId": 360,
        "canIntensiveListening": false,
        "canFollowUp": null,
        "difficulty": null,
        "dimension": null,
        "audition": false,
        "practiceTypeId": null,
        "recommendDuration": 480,
        "createdAt": "2018-10-14T09:52:08.000Z",
        "updatedAt": "2018-10-14T09:52:08.000Z",
        "material": null,
        "practiceType": null,
        "conciseName": "IELTS-Cam7-Test4-L-Sec2.mp4",
        "conciseDuration": 1822
    },
    practiceId: 1001266,
    question: {
        "id": 1006017,
        "name": "剑7听力T4S2 Q1",
        "status": "Visible",
        "type": "ChooseOne",
        "questionTagId": 382,
        "rank": 1,
        "difficulty": null,
        "exampleNum": 0,
        "stem": null,
        "extra": {
            "audioText": {
                "paragraphs": [
                    {
                        "id": "ebb166ab-bf26-d98a-fa98-da5006da1329",
                        "text": "{{time}}0.72/2.74{{end}}\n{{raw}}Welcome to all of you.{{end}}\n{{time}}2.74/4.99{{end}}\n{{raw}}Can everybody see and hear me?{{end}}\n{{time}}4.99/10.58{{end}}\n{{raw}}Good, I'm Sally, your guide for the tour of the Bicentennial Park.{{end}}\n{{time}}10.58/15.31{{end}}\n{{raw}}I hope that you're all wearing in your most comfortable shoes and that you can keep up the pace.{{end}}\n{{time}}15.31/20.54{{end}}\n{{raw}}So, let's get under way on our tour around this wonderful park.{{end}}\n{{time}}20.54/24.3{{end}}\n{{raw}}I'll start today with some general background information.{{end}}\n{{time}}24.3/28.89{{end}}\n{{raw}}There used to be a lot of factories in this area until the 1960s.{{end}}\n{{time}}28.89/41.51{{end}}\n{{raw}}Creating the park required the demolition of lots of derelict buildings on the site, so most of the exciting park space all around you was originally warehouses and storehouses.{{end}}\n{{time}}41.51/52.78{{end}}\n{{raw}}The idea of building a public park here was first discussed when a property developer proposed a high-rise housing development, but the local community wasn't happy.{{end}}\n{{time}}52.78/57.6{{end}}\n{{raw}}If the land was to be cleaned up, they wanted to use the site for recreation.{{end}}\n{{time}}57.6/66.98{{end}}\n{{raw}}Residents wanted open space for outdoor activities, rather than housing or even an indoor sports complex.{{end}}\n{{time}}66.98/69.97{{end}}\n{{raw}}Now, to the Bicentennial Park itself.{{end}}\n{{time}}69.97/76.82{{end}}\n{{raw}}It has two areas, a natural reserve and a formal park with man-made features and gardens.{{end}}\n{{time}}76.82/84.65{{end}}\n{{raw}}The tall blue-and-white building in front of us is called The Tower and is the centre point for the formal gardens.{{end}}\n{{time}}84.65/92.03{{end}}\n{{raw}}It stands twelve meters high, so follow me the upstairs to where we can take advantage of the fantastic views.{{end}}\n",
                        "type": "Text"
                    }
                ]
            },
            "instructions": {
                "paragraphs": [
                    {
                        "id": "f1a63162-478e-32ff-190f-48b868b980b8",
                        "text": "Choose the correct letter, A, B or C.",
                        "type": "Text"
                    }
                ],
                "inlineMarkup": [
                    {
                        "pid": "f1a63162-478e-32ff-190f-48b868b980b8",
                        "type": "Italic",
                        "index": 0,
                        "length": 26
                    },
                    {
                        "pid": "f1a63162-478e-32ff-190f-48b868b980b8",
                        "type": "Bold",
                        "index": 26,
                        "length": 5
                    },
                    {
                        "pid": "f1a63162-478e-32ff-190f-48b868b980b8",
                        "type": "Bold",
                        "index": 35,
                        "length": 2
                    },
                    {
                        "pid": "f1a63162-478e-32ff-190f-48b868b980b8",
                        "type": "Italic",
                        "index": 32,
                        "length": 2
                    }
                ]
            },
            "audioMaterial": {
                "src": "/atheneBackend/15397738145513ZXNg1.mp3",
                "name": "C7T4S2 材料1.mp3"
            },
            "headingNumber": "Questions 11-14",
            "imageMaterial": {
                "src": ""
            },
            "answerAnalysis": {
                "paragraphs": [
                    {
                        "id": "2fa8ab06-b79e-4c1c-d28e-e8257fd79d59",
                        "text": "Question 11\n答案：C\n定位原文：scripts:\n…Good, I'm Sally, your guide for the tour of the Bicentennial Park. I hope that you're all wearing in your most comfortable shoes and that you can keep up the pace. So, let's get under way on our tour around this wonderful park.\n解题思路：原文 “I hope that you're all wearing your most comfortable shoes and that you can keep up the pace”。“舒服的鞋子”，所以应该选择C，步行。",
                        "type": "Text"
                    },
                    {
                        "id": "879bc80c-a9c0-3dfd-b87d-121914490f7f",
                        "text": "Question 12\n答案：B\n定位原文：scripts:\n… There used to be a lot of factories in this area until the 1960s…\n解题思路：原文“There used to be a lot of factories in this area until the 1960s. Creating the park required the demolition of lots of derelict buildings on the site, so most of the exciting park space all around you was originally warehouses and storehouses.”中提到这儿曾经有很多“factories”，所以应该选择B，工业建筑。",
                        "type": "Text"
                    },
                    {
                        "id": "89b8ab5e-129a-2d62-55ce-a0411d8c14f7",
                        "text": "Question 13\n答案：A\n定位原文：scripts:\nIf the land was to be cleaned up, they wanted to use the site for recreation.  Residents wanted open space for outdoor activities, rather than housing or even an indoor sports complex.\n解题思路：原文 “If the land was to be cleaned up, they wanted to use the site for recreation. Residents wanted open space for outdoor activities, rather than housing or even an indoor sports complex.” 中提到三个选项，但是否定了B、C选项。不过三个选项并不是直接出自原文，而是原义的同义替换。如：A选项“leisure”就相当于原文中的“recreation，outdoor activities”。",
                        "type": "Text"
                    },
                    {
                        "id": "55492ee4-a18d-80f4-9adb-c25bee6c23f5",
                        "text": "Question 14\n答案：B\n定位原文：scripts:\n… The tall blue-and-white building in front of us is called The Tower and is the centre point for the formal gardens…\n解题思路：原文“The tall blue-and-white building in front of us is called The Tower and is the centre point for the formal gardens.”中清楚地告诉考生应该选择B这个公园是由两部分构成的：自然区和人工建造区，而塔在人工建造区的中心。可能许多考生不清楚“formal”在本文中的含义，但这并不影响答题。它的意思是“由几个何图形构成的”。",
                        "type": "Text"
                    }
                ],
                "inlineMarkup": [
                    {
                        "pid": "2fa8ab06-b79e-4c1c-d28e-e8257fd79d59",
                        "type": "Bold",
                        "index": 22,
                        "length": 8
                    },
                    {
                        "pid": "879bc80c-a9c0-3dfd-b87d-121914490f7f",
                        "type": "Bold",
                        "index": 22,
                        "length": 8
                    },
                    {
                        "pid": "89b8ab5e-129a-2d62-55ce-a0411d8c14f7",
                        "type": "Bold",
                        "index": 22,
                        "length": 8
                    },
                    {
                        "pid": "55492ee4-a18d-80f4-9adb-c25bee6c23f5",
                        "type": "Bold",
                        "index": 22,
                        "length": 8
                    }
                ]
            },
            "instructionalAudio": {
                "src": "/atheneBackend/1539773808160CapNfY.mp3",
                "name": "C7T4S2 指导语1.mp3"
            }
        },
        "practiceId": 1001266,
        "examId": 2,
        "videoTimeRangeId": null,
        "subjectId": 5,
        "conciseId": 8463,
        "audition": false,
        "textbookId": 3,
        "recommendDuration": 240,
        "practiceTypeId": null,
        "createdAt": "2018-10-14T09:52:08.000Z",
        "updatedAt": "2018-10-14T09:52:08.000Z",
        "materials": [
            {
                "id": 19662,
                "qNum": [
                    11
                ],
                "rank": 1,
                "subStem": "11\tWhat kind of tour is Sally leading?",
                "image": null,
                "audio": null,
                "audioReference": null,
                "reference": null,
                "direction": null,
                "videoTimeRangeId": null,
                "choices": [
                    {
                        "text": "a bus tour",
                        "option": "A"
                    },
                    {
                        "text": "a train tour",
                        "option": "B"
                    },
                    {
                        "text": "a walking tour",
                        "option": "C"
                    }
                ],
                "insertSentence": null,
                "positionTip": null,
                "answer": [
                    2
                ],
                "analysis": null,
                "examples": null,
                "questionId": 1006017,
                "origin": null,
                "score": null,
                "labels": null
            },
            {
                "id": 19663,
                "qNum": [
                    12
                ],
                "rank": 2,
                "subStem": "12\tThe original buildings on the site were",
                "image": null,
                "audio": null,
                "audioReference": null,
                "reference": null,
                "direction": null,
                "videoTimeRangeId": null,
                "choices": [
                    {
                        "text": "houses.",
                        "option": "A"
                    },
                    {
                        "text": "industrial buildings.",
                        "option": "B"
                    },
                    {
                        "text": "shops.",
                        "option": "C"
                    }
                ],
                "insertSentence": null,
                "positionTip": null,
                "answer": [
                    1
                ],
                "analysis": null,
                "examples": null,
                "questionId": 1006017,
                "origin": null,
                "score": null,
                "labels": null
            },
            {
                "id": 19664,
                "qNum": [
                    13
                ],
                "rank": 3,
                "subStem": "13\tThe local residents wanted to use the site for",
                "image": null,
                "audio": null,
                "audioReference": null,
                "reference": null,
                "direction": null,
                "videoTimeRangeId": null,
                "choices": [
                    {
                        "text": "leisure.",
                        "option": "A"
                    },
                    {
                        "text": "apartment blocks.",
                        "option": "B"
                    },
                    {
                        "text": "a sports centre.",
                        "option": "C"
                    }
                ],
                "insertSentence": null,
                "positionTip": null,
                "answer": [
                    0
                ],
                "analysis": null,
                "examples": null,
                "questionId": 1006017,
                "origin": null,
                "score": null,
                "labels": null
            },
            {
                "id": 19665,
                "qNum": [
                    14
                ],
                "rank": 4,
                "subStem": "14\tThe Tower is at the centre of the",
                "image": null,
                "audio": null,
                "audioReference": null,
                "reference": null,
                "direction": null,
                "videoTimeRangeId": null,
                "choices": [
                    {
                        "text": "nature reserve.",
                        "option": "A"
                    },
                    {
                        "text": "formal gardens.",
                        "option": "B"
                    },
                    {
                        "text": "Bicentennial Park.",
                        "option": "C"
                    }
                ],
                "insertSentence": null,
                "positionTip": null,
                "answer": [
                    1
                ],
                "analysis": null,
                "examples": null,
                "questionId": 1006017,
                "origin": null,
                "score": null,
                "labels": null
            }
        ]
    },
    questionCount: 8,
    questionId: 1006017,
    questionIndex: 1,
    questionMaterialIds: [
      {
        answerIndexs: [0],
        qNum: [11],
        questionId: 1006017,
        questionMaterialId: 19662,
      },
      {
        answerIndexs: [1],
        qNum: [12],
        questionId: 1006017,
        questionMaterialId: 19663,
      },
      {
        answerIndexs: [2],
        qNum: [13],
        questionId: 1006017,
        questionMaterialId: 19664,
      },
      {
        answerIndexs: [3],
        qNum: [14],
        questionId: 1006017,
        questionMaterialId: 19665,
      },
    ],
    subject: "Listening",
    type: "ListeningQuestion",
  },
  newSetRecord: {},
  newSetStepRecord: () => {},
  cdnUrl: 'https://media8.smartstudy.com',
};
<IeltsListeningQuestion
    params={{ mode: 'package' }} 
    {...IeltsListeningData}
    >jsjjs</IeltsListeningQuestion>
```