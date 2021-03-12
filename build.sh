
# import .env file variables
export $(egrep -v '^#' .env | xargs)

echo $GOOGLE_PROJECT_ID
echo $CONTAINER_IMAGE_NAME

gcloud builds submit \
  --tag gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_IMAGE_NAME \
  --project=$GOOGLE_PROJECT_ID