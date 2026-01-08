from .models import Notification

def create_notification(user, title, message):
    Notification.objects.create(
        user=user,
        title=title,
        message=message
    )
def mark_notification_as_read(notification_id): 
    try:
        notification = Notification.objects.get(id=notification_id)
        notification.is_read = True
        notification.save()
    except Notification.DoesNotExist:
        pass
