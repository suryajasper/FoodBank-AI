#include "registershelter.h"
#include "ui_registershelter.h"

RegisterShelter::RegisterShelter(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::RegisterShelter)
{
    ui->setupUi(this);
    getShelters();
    server = QUrl("http://suryajasper.com/shelters");
}

RegisterShelter::~RegisterShelter()
{
    delete ui;
}


void RegisterShelter::getShelters() {
    QNetworkRequest request(server);
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    QNetworkAccessManager nam;
    QNetworkReply *reply = nam.get(request);

    while (!reply->isFinished())
    {
        qApp->processEvents();
    }

    QByteArray response_data = reply->readAll();
    QJsonDocument json = QJsonDocument::fromJson(response_data);
}
