#include "registershelter.h"
#include "ui_registershelter.h"
#include <QtDebug>
#include "menu.h"

RegisterShelter::RegisterShelter(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::RegisterShelter)
{
    ui->setupUi(this);
    server = QUrl("http://35.239.86.72:4000/shelters");
    getShelters();
}

RegisterShelter::~RegisterShelter()
{
    delete ui;
}


void RegisterShelter::getShelters() {
    QNetworkRequest request(server);
    //request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    QNetworkAccessManager nam;
    QNetworkReply *reply = nam.get(request);

    while (!reply->isFinished())
    {
        qApp->processEvents();
    }

    QByteArray response_data = reply->readAll();
    qDebug() << " hell" << response_data;
    QJsonDocument json = QJsonDocument::fromJson(response_data);

    displayShelters(json);
}

void RegisterShelter::displayShelters(QJsonDocument json) {
    QJsonArray a = json.array();
    for (int i = 0; i < a.size() - 25; i++) {
        QJsonValue v = a.at(i);
        QJsonObject o = v.toObject();
        qDebug() << o;
        QPushButton* shelterButton = new QPushButton(o.value("name").toString());
        shelterButton->setMaximumHeight(200);
        shelterButton->setSizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        QObject::connect(shelterButton, SIGNAL(clicked()),this, SLOT(clickedSlot()));

        ui->verticalLayout->addWidget(shelterButton);
    }
}

void RegisterShelter::clickedSlot() {
    QPushButton* buttonSender = qobject_cast<QPushButton*>(sender()); // retrieve the button you have clicked
    QString buttonText = buttonSender->text();

    menu* r = new menu(buttonText);
    this->close();
    r->show();
}
