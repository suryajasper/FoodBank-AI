#ifndef REGISTERSHELTER_H
#define REGISTERSHELTER_H

#include <QMainWindow>
#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkReply>
#include <QJsonDocument>

namespace Ui {
class RegisterShelter;
}

class RegisterShelter : public QMainWindow
{
    Q_OBJECT

public:
    RegisterShelter(QWidget *parent = nullptr);
    ~RegisterShelter();

private:
    Ui::RegisterShelter *ui;
    QUrl server;
    void getShelters();
};

#endif // REGISTERSHELTER_H
