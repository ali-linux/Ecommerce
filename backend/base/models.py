from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager
from django.contrib.auth.validators import UnicodeUsernameValidator

class AccountManager(BaseUserManager):
  def create_user(self, email, username, password=None):
    if not email:
      raise ValueError("Users must have an email address")
    if not username:
      raise ValueError("Users must have a username")
    user = self.model(
      email=self.normalize_email(email),
      username=username
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, email, username, password):
    user = self.create_user(email, username, password)
    user.is_superuser = True
    user.is_admin = True
    user.is_staff = True
    user.save(using=self._db)
    return user

class Account(AbstractBaseUser):
  email = models.EmailField(verbose_name='Email', max_length=60, unique=True)
  username_validator = UnicodeUsernameValidator()
  username = models.CharField(
    max_length=30,
    unique=True,
    help_text=("Required. 150 characters or fewer. Letters, and digits only."),
    validators = [username_validator],
    error_messages = {
        'unique': ("A user with that username already exists."),
    },
    )
  first_name = models.CharField(max_length=90, blank=True, null=True)
  last_name = models.CharField(max_length=90, blank=True, null=True)
  date_join = models.DateTimeField(auto_now_add=True, verbose_name='date joined')
  last_login = models.DateTimeField(auto_now=True, verbose_name='last login')
  is_admin = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username',]
  objects = AccountManager()
  
  def __str__(self):
    return self.email
  
  def has_perm(self, perm, obj=None):
    return self.is_admin
  def has_module_perms(self, app_label):
    return True
 

class Product(models.Model):
  user = models.ForeignKey(
    Account,
    on_delete=models.SET_NULL,
    null=True
  )
  name = models.CharField(
    max_length=200,
    null=True,
    blank=True
  )
  image         = models.ImageField(null=True, blank=True)
  brand         = models.CharField(max_length=200, null=True, blank=True)
  category      = models.CharField(max_length=200, null=True, blank=True)
  description   = models.TextField(null=True, blank=True)
  rating        = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  numReviews    = models.IntegerField(null=True, blank=True, default=0)
  price         = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  countInStock  = models.IntegerField(null=True, blank=True, default=0)
  createdAt     = models.DateTimeField(auto_now_add=True)
  _id           = models.AutoField(primary_key=True, editable=False)

  def __str__(self):
      return self.name

class Review(models.Model):
  product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
  user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
  name = models.CharField(max_length=200, null=True, blank=True)
  rating = models.IntegerField(null=True, blank=True, default=0)
  comment = models.TextField(null=True, blank=True)
  createdAt = models.DateTimeField(auto_now_add=True)
  _id = models.AutoField(primary_key=True, editable=False)

  def __str__(self):
      return str(self.rating)

class Order(models.Model):
  user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
  paymentMethod = models.CharField(max_length=200, null=True, blank=True)
  taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  isPaid = models.BooleanField(default=False)
  paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
  isDelivered = models.BooleanField(default=False)
  deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
  createdAt = models.DateTimeField(auto_now_add=True)
  _id = models.AutoField(primary_key=True, editable=False)

  def __str__(self):
    return str(self.createdAt)

class OrderItem(models.Model):
  product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
  order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
  name = models.CharField(max_length=200, null=True, blank=True)
  qty = models.IntegerField(null=True, blank=True, default=0)
  price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  image = models.CharField(max_length=200, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)

  def __str__(self):
    return str(self.name)


class ShippingAddress(models.Model):
  order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
  address = models.CharField(max_length=200, null=True, blank=True)
  city = models.CharField(max_length=200, null=True, blank=True)
  postalCode = models.CharField(max_length=200, null=True, blank=True)
  country = models.CharField(max_length=200, null=True, blank=True)
  shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)

  def __str__(self):
    return str(self.address)
