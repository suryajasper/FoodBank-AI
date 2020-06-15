#ifndef INFORMATION_H
#define INFORMATION_H

#include <QMainWindow>
#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkReply>
#include <QJsonDocument>
#include <QJsonArray>
#include <QJsonValue>
#include <QJsonObject>

namespace Ui {
class Information;
}

class Information : public QMainWindow
{
    Q_OBJECT

public:
    explicit Information(QWidget *parent = nullptr);
    ~Information();

public slots:
    void clickedSlot();
    void next();

private:
    Ui::Information *ui;
    int calculateCalories(bool gender, int height, int age, double weight);
    void getFood();
    void displayFood(QJsonDocument json);
    int calories;
};

#endif // INFORMATION_H
