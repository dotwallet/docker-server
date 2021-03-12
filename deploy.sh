
# import .env file variables
export $(egrep -v '^#' .env | xargs)

echo $CLIENT_SECRET
echo $CLIENT_ID
echo $GOOGLE_SERVICE_NAME

gcloud run deploy $GOOGLE_SERVICE_NAME \
  --platform=managed \
  --image=gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_IMAGE_NAME \
  --project=$GOOGLE_PROJECT_ID \
  --set-env-vars=[CLIENT_SECRET=$CLIENT_SECRET,CLIENT_ID=$CLIENT_ID] 