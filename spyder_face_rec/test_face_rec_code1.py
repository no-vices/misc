import cv2  

#Specify the image path for face detection and XML file for the cascade   
photo_path = "band.jpg" 
cascade_path = "haarcascade_frontalface.xml"  

#Initialise the Haar Cascade Classifier with the XML file  
haar_face_cascade = cv2.CascadeClassifier(cascade_path)  

#Read the photo and convert to grayscale  
photo = cv2.imread(photo_path)  
grayscale = cv2.cvtColor(photo, cv2.COLOR_BGR2GRAY)  

# Detect faces in the photo using OpenCV library  
faces = haar_face_cascade.detectMultiScale(  
grayscale,  
scaleFactor = 1.1,  
minNeighbors = 5,  
minSize = (30, 30)  
)  

print("Found {0} faces!".format(len(faces)))  

# Draw a rectangle around the faces  
for (x, y, w, h) in faces:  
	cv2.rectangle(photo, (x, y), (x+w, y+h), color = (0, 255, 0), thickness = 2)  

cv2.imshow("Faces found", photo)  
cv2.waitKey(0)