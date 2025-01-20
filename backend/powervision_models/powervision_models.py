# _*_ coding: utf-8 _*_

from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


class Accounts(Base):
    __tablename__ = "accounts"
    id = Column("id", Integer, primary_key=True)
    name = Column("name", Text)
    password = Column("password", Text)
    dt_updated = Column("dt_updated", DateTime, server_default=func.now())


class BatteryType(Base):
    __tablename__ = "battery_type"
    id = Column("id", Integer, primary_key=True)
    name = Column("name", Text)
    dt_updated = Column("dt_updated", DateTime, server_default=func.now())


class Device(Base):
    __tablename__ = "device"
    id = Column("id", Integer, primary_key=True)
    name = Column("name", Text)
    model = Column("model", Text)
    account_id = Column("account_id", Integer, ForeignKey(Accounts.id))
    batteryid = Column("batteryid", Integer, ForeignKey(BatteryType.id))
    dt_updated = Column("dt_updated", DateTime, server_default=func.now())


class Batterystatus(Base):
    __tablename__ = "battery_status"
    id = Column("id", Integer, primary_key=True)
    device_id = Column("device_id", Integer, ForeignKey(Device.id))
    battery_level = Column("battery_level", Float)
    number_charges = Column("number_charges", Integer)
    dt_updated = Column("dt_updated", DateTime, server_default=func.now())


class Charging(Base):
    __tablename__ = "charging"
    id = Column("id", Integer, primary_key=True)
    device_id = Column("device_id", Integer, ForeignKey(Device.id))
    last_charged = Column("last_charged", DateTime, server_default=func.now())
    depletion_date = Column("depletion_date", Date)
    dt_updated = Column("dt_updated", DateTime, server_default=func.now())
