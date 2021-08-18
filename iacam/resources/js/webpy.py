#!c:/Windows/py.exe
import cgi
import cgitb
cgitb.enable()
import json
from ibm_watson import VisualRecognitionV4
from ibm_watson.visual_recognition_v4 import AnalyzeEnums, FileWithMetadata
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import numpy as np
import cv2



authenticator = IAMAuthenticator('mPmyhzibcxVZ-RqeXfu42QCr7VxLlJJdak9iO4KPJMej')
visual_recognition = VisualRecognitionV4(
    version='2020-02-05',
    authenticator=authenticator,
    #disableSslVerification= true
)

visual_recognition.set_service_url('https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/1e1619c4-a6ab-4adb-a7ca-b4a18bad6fe2')


cap = cv2.VideoCapture(0)
ret, img = cap.read()
cv2.imwrite('1.jpg',img)
#result=""
with open('1.jpg', 'rb') as captura:
    result = visual_recognition.analyze(
        collection_ids=['77a128b5-c9e2-4bdf-9c38-4019f1fc12f3'],
        features=[AnalyzeEnums.Features.OBJECTS.value],
        threshold= 0.40,
        images_file=[
            FileWithMetadata(captura),
            #FileWithMetadata(dice_file)
        ]).get_result()
    #print(json.dumps(result, indent=0))
    result=print(json.dumps(result))

cap.release()
cv2.destroyAllWindows()

#print(result)