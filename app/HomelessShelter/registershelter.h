#ifndef REGISTERSHELTER_H
#define REGISTERSHELTER_H

#include <QMainWindow>
#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkReply>
#include <QJsonDocument>
#include <QJsonArray>
#include <QJsonValue>
#include <QJsonObject>
#include <QPushButton>
#include "menu.h"

namespace Ui {
class RegisterShelter;
}

class RegisterShelter : public QMainWindow
{
    Q_OBJECT

public:
    RegisterShelter(QWidget *parent = nullptr);
    ~RegisterShelter();

public slots:
    void clickedSlot();

private:
    Ui::RegisterShelter *ui;
    QUrl server;
    void getShelters();
    void displayShelters(QJsonDocument json);
};

#endif // REGISTERSHELTER_H
